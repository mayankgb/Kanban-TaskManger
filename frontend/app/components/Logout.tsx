import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
axios.defaults.withCredentials=true

export function Logout(){
    const router = useRouter()

    const handleLogout= async () => {
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout`,{
                headers:{
                    Authorization:`Bearer ${JSON.parse(localStorage.getItem("token")||JSON.stringify("dfdsfdsf"))}`
                  }
            })
            localStorage.removeItem("token")
            toast.success("successfully logged out")
            router.push("/login")
        }catch(e){
            console.log(e)
            toast.error("something went wrong")
        }
    }

    return(
        <div>
            <Button variant={"secondary"} onClick={handleLogout} className="">Logout</Button>
        </div>
    )
}