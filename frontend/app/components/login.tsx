"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

export function LoginComponent(){
    const [isDisable, setisDisable] = useState(false)
    const [logInInput, setLoginInput] = useState({
        email:"",
        password:""
    })
    const router = useRouter()

    const handleSubmit = async(test:boolean)=>{
        setisDisable(true)
        try{
            const loginData = test
            ? { email: "maysk03jun@gmail.com", password: "0909090" }
            : logInInput;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`,{
                loginData
            },
        {
            withCredentials:true
        })

            if (response.status===200) {
                router.push("/dashboard")
                setisDisable(false)
                setLoginInput({email:"",password:""})
                toast.success("Logged in")
            }

        }catch(e){
            if (axios.isAxiosError(e)) {
                toast.error("something went wrong")
                console.log(e?.response?.data.message)
            }
            setisDisable(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setLoginInput((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    return (
            <div className="bg-neutral-800 h-96 w-96 rounded-2xl flex flex-col justify-around items-center py-2">
                <div className="flex flex-col items-center">
                    <span className="block text-4xl text-white font-bold">Welcome to</span>
                    <span className=" bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-red-400 text-5xl font-bold">Kanban</span>
                </div>
                    <div>
                    <div className="w-72 h-20">
                        <label htmlFor="email" className="block font-semibold text-white mb-1 ">Email</label>
                        <Input type="text" onChange={(e)=>handleChange(e)}  name="email" className="border-2 rounded-lg border-neutral-700" placeholder="email"/>
                    </div>
                    <div className="w-72">
                        <label htmlFor="password" className="block font-semibold text-white mb-1 ">Password</label>
                        <Input type="password" value={logInInput.password} onChange={(e)=>handleChange(e)} className="border-2 rounded-lg border-neutral-700" name="password" placeholder="password"/>
                    </div>
                </div>
                <div>
                    <div className="p-2">
                        <Button disabled={isDisable} onClick={()=>handleSubmit(true)} className="w-72 h-11">{isDisable?<BiLoader className="animate-spin"/>:"Login with test credentials"}</Button>
                    </div>
                    <div className="p-2">
                        <Button disabled={isDisable} className="w-72 p-4" onClick={()=>handleSubmit(false)}>Login</Button>
                    </div>
                </div>
            </div>
    )
}