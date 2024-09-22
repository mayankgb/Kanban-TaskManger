"use client"

import { ThemeProvider } from "next-themes"
import { useLogin } from "./hooks"
import { RecoilRoot } from "recoil"
import { BiLoader } from "react-icons/bi"

export default function Provider({children}:{children:React.ReactNode}){

    const {loading} = useLogin()

    if (loading) {
        return(
            <div className="flex justify-center items-center h-screen ">
                <BiLoader className="animate-spin text-lg"/>
            </div>
        )
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
            <RecoilRoot>
                {children}
           </RecoilRoot>
        </ThemeProvider>
    )
}