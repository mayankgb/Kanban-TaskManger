"use client"

import React, { useState, useMemo } from 'react'
import { DndContext, DragOverlay, useSensors, useSensor, PointerSensor, KeyboardSensor, DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core'
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'

import { DroppableColumn } from './Droppable'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { column,  task } from '../store/atom'

import { AddTodo } from './AddTodo'
import axios from 'axios'
import { Todo } from '../lib/types'
import { TodoCard } from './TodoCard'
import { OpenSidebar } from './SideButton'



export default function KanbanBoard() {
 
  const [newCol , setNewCol]  = useRecoilState(column)
  const setTodo = useSetRecoilState(task)


  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Memoize the task-to-column mapping for better performance
  const taskToColumnMap = useMemo(() => {
    const map = new Map<string, string>()
    newCol.forEach(column => {
      column.tasks.forEach(task => {
        map.set(task._id, column.id)
      })
    })
    return map
  }, [newCol])

  const findColumnOfTask = (taskId: string) => {
    const columnId = taskToColumnMap.get(taskId)
    return newCol.find(column => column.id === columnId)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    console.log(active.id as string)
    setActiveId(active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
   console.log(event)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    console.log(active)

    const activeColumn = findColumnOfTask(active.id as string)
    const overColumn = newCol.find(col => col.id === over.id) || findColumnOfTask(over.id as string)
    if (!activeColumn || !overColumn) return

    if (activeColumn !== overColumn) {
      setTodo((prev)=>{
        const tasks = prev?.map((val)=>{
          if (val._id === active.id) {
            return{
              ...val,
              status:overColumn.id
            }
          }
          return val
        })
        return tasks||prev
      })
      setNewCol(prev => {
        const activeIndex = activeColumn.tasks.findIndex(task => task._id === active.id)
        const overIndex = overColumn.tasks.findIndex(task => task._id === over.id)
        console.log(activeColumn)
        console.log(overColumn)

        return prev.map( col => {

          if (col.id === activeColumn.id) {
            console.log("done seen")
            return { ...col, tasks: col.tasks.filter(task => task._id !== active.id) }
          }

          if (col.id === overColumn.id) {
            console.log("done seen 540")
              const newTasks = [...col.tasks]
              const exisitngTask:Todo ={
                ...activeColumn.tasks[activeIndex],
                status:overColumn.id
              } 
              newTasks.splice(overIndex, 0, exisitngTask)
              return { ...col, tasks: newTasks }
          }
          return col
        })
      })

       await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/update/${active.id}`,{
        status:overColumn?.id
      },{
        withCredentials:true
      })
  
    } else {
      setNewCol(prev => {
        return prev.map(col => {
          if (col.id === activeColumn.id) {
            const oldIndex = col.tasks.findIndex(task => task._id === active.id)
            const newIndex = col.tasks.findIndex(task => task._id === over.id)
            return { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) }
          }
          return col
        })
      })
    }
  }

  
  return (
    <div className="p-4 w-full mx-auto">
      <div className='flex items-center'>
        <div className=' lg:hidden block'>
          <OpenSidebar/>
        </div>
        <h1 className="text-2xl ml-2 mt-2 font-bold mb-4">Kanban TodoManager</h1>
      </div>
      <div className="flex mb-4 ml-2 gap-6">
       <AddTodo/>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid  grid-cols-1 lg:grid-cols-3  gap-4 w-full">
          {newCol.map(col => (
            <DroppableColumn key={col.id} column={col} tasks={col.tasks} />
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="bg-primary text-primary-foreground p-2 rounded shadow">
                <TodoCard t={newCol.find(col => col.tasks.some(task => task._id === activeId))?.tasks.find(task => task._id === activeId)}/>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}