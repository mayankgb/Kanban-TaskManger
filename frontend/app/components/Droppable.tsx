import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SortableContext, verticalListSortingStrategy, useSortable} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion, AnimatePresence } from 'framer-motion'
import { Todo} from "../lib/types"
import { Column } from "../lib/types"
import { TodoCard } from "./TodoCard"

const SortableTask: React.FC<{ task: Todo }> = ({ task }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: task._id })
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }
  
    return (
      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="border border-neutral-700 bg-red-400 mb-2 w-full lg:w-fit rounded-xl shadow cursor-move"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TodoCard t={task}/>
      </motion.div>
    )
  }
  
export const DroppableColumn: React.FC<{ column: Column, tasks: Todo[] }> = ({ column, tasks }) => {
      const { setNodeRef } = useSortable({
          id: column.id,
          data: {
            type: 'column',
            column,
          },
        })
    return (
      <Card>
        <CardHeader>
          <CardTitle>{column.title}</CardTitle>
        </CardHeader>
        <CardContent ref={setNodeRef} className="max-h-[16rem]  overflow-auto">
          <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
            <AnimatePresence>
              {tasks.map(task => (
                <SortableTask key={task._id} task={task} />
              ))}
            </AnimatePresence>
          </SortableContext>
        </CardContent>
      </Card>
    )
  }
  