"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { BiLoader } from "react-icons/bi";

export function SignUpComponent(){
    const [isDisable, setisDisable] = useState(false)
    const [loginInput, setLoginInput] = useState({
        email:"",
        password:"",
        userName:"",
    })
    const router = useRouter()

    const handleSubmit = async(test:boolean)=>{
        setisDisable(true)
        try{
            const response = await axios.post("http://localhost:8000/user/signup",{
                loginInput
            },{
                withCredentials:true
            })

            if (response.status===200) {
                setisDisable(false)
                setLoginInput({email:"",password:"",userName:""})
                router.push("/dashboard")
            }

        }catch(e){
            console.log(e)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setLoginInput((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    return (
            <div className="bg-neutral-800 h-[70%] w-96 rounded-2xl flex flex-col justify-around items-center py-2">
                <div className="flex flex-col items-center">
                    <span className="block text-4xl text-white font-bold">Welcome to</span>
                    <span className=" bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-red-400 text-5xl font-bold">Kanban</span>
                </div>
                <div>
                    <div className="w-72 mb-2">
                        <label htmlFor="userName" className="block font-semibold text-white mb-1 ">Username</label>
                        <Input type="text" value={loginInput.userName} onChange={(e)=>handleChange(e)} name="userName" className="border-2 rounded-lg border-neutral-700" placeholder="@henius"/>
                    </div>
                    <div className="w-72 h-16">
                        <label htmlFor="email" className="block font-semibold text-white mb-1 ">Email</label>
                        <Input type="text" value={loginInput.email} onChange={(e)=>handleChange(e)}  name="email" className="border-2 rounded-lg border-neutral-700" placeholder="email"/>
                    </div>
                    <div className="w-72 mt-2">
                        <label htmlFor="password" className="block font-semibold text-white mb-1 ">Password</label>
                        <Input type="password" value={loginInput.password} onChange={(e)=>handleChange(e)} className="border-2 rounded-lg border-neutral-700" name="password" placeholder="password"/>
                    </div>
                </div>
                <div className="p-2">
                    <Button disabled={isDisable} className="w-72 p-4" onClick={()=>handleSubmit(false)}>{isDisable?<BiLoader className="animate-spin"/>:"Signup"}</Button>
                </div>
            </div>
    )
}