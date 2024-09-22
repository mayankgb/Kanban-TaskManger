import axios from "axios"
import { useRouter ,usePathname} from "next/navigation"
import { useEffect, useState } from "react"
import { Todo } from "../lib/types"
import { useRecoilState } from "recoil"
import { column, task } from "../store/atom"
import toast from "react-hot-toast"

axios.defaults.withCredentials = true

export const useTodo = () =>{
    const [todo, setTodo] = useRecoilState(task)
    const [loading,setLoading] = useState<boolean>(false)
    const [add , setAdd]  = useRecoilState(column)
    

    useEffect(()=>{

        const main = async () => {
            setLoading(true)
            try{
                  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/getAllTask`,{
                    headers:{
                      Authorization:`Bearer ${JSON.parse(localStorage.getItem("token")||JSON.stringify("dfdsfdsf"))}`
                    }
                  })
              
                  const data = response.data.allTask
                  // console.log(response.data)
                  setTodo(data)
                  const arr = data?.filter((val:Todo)=>val.status === "ToDo")
                  console.log(arr)
                  const newCol = add.map((col)=>({
                      ...col,
                      tasks:data?.filter((val:Todo)=>val.status === col.id)
                    }
                    ))
                    console.log(newCol)
                    setAdd(newCol)
                  setLoading(false)

                }catch(e){
                  toast.error("you are not logged in")
                }
            }
        main() 
    },[])

    return {loading,todo}
}

export const useLogin= () => {
    const [message, setMessage] = useState("")
    const [loading, setloading] = useState(false)
    const router = useRouter()
    const pathName = usePathname()

    useEffect(()=>{
        
        const login = async () => {
            console.log()
            setloading(true);
            console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
            console.log(localStorage.getItem("token"))
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,{
                    headers:{
                      Authorization:`Bearer ${JSON.parse(localStorage.getItem("token")||JSON.stringify("dfdsfdsf"))}`
                    }
                  })
    
                if (response.status===200) {
                    router.push("/dashboard")
                    toast.success(response.data.message)
                    setloading(false)
                    setMessage(response.data.message)
                }
            }catch(e){
                if (axios.isAxiosError(e)) {
                  toast.error("you are not logged in")

                    if (localStorage.getItem("token")) {
                       localStorage.removeItem("token")
                    }

                    console.log(pathName)
                    // Handle Axios-specific errors
                    if (e.response?.status === 400) {
                      console.log("Bad Request:", e.response.data.message,e.response.data);
                      if (pathName!=="/login") {
                        console.log(pathName)
                        router.push("/login") 
                      }
                      
                      setloading(false)
                    } else if (e.response?.status === 404) {
                        setloading(false)
                        
                      console.log("Not Found:", e.response.data);
                      if (pathName!=="/login") {
                        console.log(pathName)
                        router.push("/login") 
                      }
                    }else{
                        localStorage.getItem("token")
                        setloading(false)
                        if (pathName!=="/login") {
                            console.log(pathName)
                            router.push("/login") 
                          }

                    }
                }
            }

        }
        login()
    },[])

    return{loading,message}

}