import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { column, task } from "../store/atom";
import { BiLoader } from "react-icons/bi";

export function DeleteTask({id ,status}:{id:string,status:string}){

    const [loading, setLoading] = useState(false)
    const setTodo = useSetRecoilState(task)
    const setCol = useSetRecoilState(column)

    const deleteTodo = async () => {
        setLoading(true)
        try{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/delete/${id}`,{
                withCredentials:true
            })
            console.log(response)
            setLoading(false)
            setTodo((prev)=>prev.filter((val)=>val._id!==id))
            setCol((prev)=>{
                const newCol = prev.map((val)=>{
                    if (val.id === status) {
                        return{
                            ...val,
                            tasks:val.tasks.filter((t)=>t._id!==id)
                        }
                    }
                    return val
                })
                return newCol
            })
            toast.success("task deleted successfully")
        }catch(e){
            console.log(e)
            setLoading(false)
            toast.error("something went wrong")
        }


    }

    return(
        <div className="cursor-pointer">
            {loading?<BiLoader/>:<RiDeleteBin6Line onClick={deleteTodo} className="text-red-500 text-md"/>}
        </div>
    )
}