"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";


export default function ThemeSwitch(){
    
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme:theme 

    return(
        <div className="">
            <Button onClick={()=> theme === "dark"? setTheme("light") :setTheme("dark") }>click ME</Button>
        </div>
    )
}