import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker, SelectPriority, SelectStatus } from "./SelectStatus"
import { BiLoader } from "react-icons/bi";
import { ChangeEvent, useState } from "react"
import {AnimatePresence, motion} from "framer-motion"
import toast from "react-hot-toast"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { column, task } from "../store/atom"
import { Todo } from "../lib/types"
import { MdEdit } from "react-icons/md"
axios.defaults.withCredentials = true;

export function EditTodo({todo}:{todo:Todo}) {

    const [loading, setLoading] = useState(false)
    const [isOpen , setIsOpen] = useState(false)
    const [todoInput, setTodoInput] = useState({
        title:todo.title,
        description:todo.description,
        status:todo.status,
        priority:todo.priority as "High" | "Medium" | "Low",
        dueDate:new Date(todo.dueDate).toISOString()
    })
    const setCol = useSetRecoilState(column)
    const setTodo = useSetRecoilState(task)

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setTodoInput((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit = async ()=>{
        if (!todoInput.title.length || !todoInput.description.length|| !todoInput.priority.length || !todoInput.status.length ||  !todoInput.dueDate ) {
            toast.error("invalid inputs")
            return   
        }
        setLoading(true)
        try{
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/update/full/${todo._id}`,{
                todoInput
            })

            if(response.status===200){
                const data = response.data.savedTask 
                console.log(data)
                const newTodo:Todo = {
                    _id:todo._id,
                    ...todoInput
                }
                setTodo((prev)=>{
                    const existingTodo = prev.filter((val)=>val._id!==newTodo._id)
                    return[...existingTodo,newTodo]
                })
                setCol((prev)=>{
                    const newCol = prev.map((col)=>{
                        if (col.id === newTodo.status) {
                            const todo = col.tasks.filter((val)=>val._id!==newTodo._id)
                            return{
                                ...col,
                                tasks:[...todo,newTodo]
                            }
                        }
                        return col
                    })

                    return newCol
                })
                setLoading(false)
                setIsOpen(false)
                toast.success("edited successfully")
            }
        }catch(e){
            if (axios.isAxiosError(e)) {
                if (e.response?.status) {
                    toast.error(e.response.data.message,{style:{
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }},
                      )
                      console.log(e)
                      setLoading(false)   
                }
            }else{
                toast.error("something went wrong",{style:{
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }},
                  ) 
                  console.log(e)
                  setLoading(false)  
                
            }

        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-clip-text bg-transparent" onClick={()=>setIsOpen(true)} variant="default"><MdEdit className="text-yellow-300 text-md"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            edit todo that&apos;s it  
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-around  items-center  gap-5">
            <Label htmlFor="title" title="text-right">
              Title
            </Label>
            <Input
              disabled={loading}
              onChange={(e)=>handleChange(e)}
              id="title"
              name="title"
              defaultValue={todo.title}
              className=" w-[70%]"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              disabled={loading}
              onChange={(e)=>handleChange(e)}
              id="descritpion"
              name="description"
              defaultValue={todo.description}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              status
            </Label>
            <SelectStatus status={todo.status} setStatus={setTodoInput} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              priority
            </Label>
            <SelectPriority priority={todo.priority} setPriority={setTodoInput}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <DatePicker setDate={setTodoInput} date={todoInput.dueDate}/>
          </div>
          
        </div>
        <DialogFooter>
            <AnimatePresence mode="popLayout">
                <motion.div layout  transition={{ duration: 0.3 }}>
                    <Button  onClick={handleSubmit} className="w-32" disabled={loading} type="submit">
                        {loading?<BiLoader className="text-xl  animate-spin"/>:"Save changes"}
                    </Button>
                </motion.div>
            </AnimatePresence>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
