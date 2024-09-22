"use client"

import { useState } from "react";
import { LoginComponent } from "../components/login";
import { SignUpComponent } from "../components/signUp";

export default function Login(){

    const [signup,setSignup] = useState(false)

    return(
        <div className="h-screen bg-neutral-900 flex flex-col justify-center items-center">
            <div className="text-white mb-2">{`${signup?'Already a User?':'New user?'}`} <span onClick={()=>setSignup((prev)=>!prev)} className="underline cursor-pointer">{`${signup?'Login':'Signup'}`}</span></div>
            {signup?<SignUpComponent/>:<LoginComponent/>}
        </div>
    )

}