"use client"

import { useTodo } from "../hooks"
import {motion} from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import { TodoCard } from "./TodoCard"
import { useRecoilValue } from "recoil"
import { filt, task } from "../store/atom"


export function AllTasks() {

  const todo = useRecoilValue(task)
  const renderTask = useRecoilValue(filt)

  if (!todo) {
    return
  }
 

  if (todo.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No tasks found. Start by adding a new task!
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {renderTask==="all"?todo.map((t,index)=><TodoCard key={index} t={t}/>):
      (todo.map((t,index) => (
        (renderTask === t.status) ?      <TodoCard key={index} t={t}/>:
        (renderTask === t.status) ?  <TodoCard key={index} t={t}/>:
        (renderTask === t.status)&& <TodoCard key={index} t={t}/>
        // <TodoCard t={t}/>
      )))
      } 
    </div>
  )
}