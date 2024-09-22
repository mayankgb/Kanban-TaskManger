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
import { PlusCircle } from 'lucide-react'
import toast from "react-hot-toast"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { column, task } from "../store/atom"
import { Todo } from "../lib/types"
axios.defaults.withCredentials = true;

export function AddTodo() {

    const [loading, setLoading] = useState(false)
    const [isOpen , setIsOpen] = useState(false)
    const [todoInput, setTodoInput] = useState({
        title:"",
        description:"",
        status:"",
        priority:"" as "High" | "Medium" | "Low",
        dueDate:new Date().toISOString()
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/create`,{
                todoInput
            },{
              headers:{
                Authorization:JSON.parse(localStorage.getItem("token")||"")
              }
            })

            if(response.status===200){
                const data = response.data.savedTask 
                console.log(data)
                const newTodo:Todo = {
                    title: data.title,
                    _id: data._id,
                    description: data.description,
                    priority: data.priority,
                    status: data.status,
                    dueDate: data.dueDate
                }
                setTodo((prev)=>([...prev,newTodo]))
                setCol((prev)=>{
                    const newCol = prev.map((col)=>{
                        if (col.id === newTodo.status) {
                            return{
                                ...col,
                                tasks:[newTodo,...col.tasks]
                            }
                        }
                        return col
                    })

                    return newCol
                })
                setIsOpen(false)
                setLoading(false)
                toast.success("added successfully")
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
                      setIsOpen(false)
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
                  setIsOpen(false)
                
            }

        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={()=>setIsOpen(true)} variant="default"><PlusCircle className="mr-2 text-sm"/>Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
            add todo sir that&apos;s it 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-around  items-center  gap-5">
            <Label htmlFor="title" title="text-right">
              Title
            </Label>
            <Input
              onChange={(e)=>handleChange(e)}
              id="title"
              name="title"
              placeholder="Hire me as a dev"
              className=" w-[70%]"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              onChange={(e)=>handleChange(e)}
              id="descritpion"
              name="description"
              placeholder="i can grow your business by to many folds 😁"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              status
            </Label>
            <SelectStatus setStatus={setTodoInput} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              priority
            </Label>
            <SelectPriority setPriority={setTodoInput}/>
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
