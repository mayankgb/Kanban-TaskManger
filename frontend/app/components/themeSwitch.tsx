"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";


export default function ThemeSwitch(){
    
    const { systemTheme, theme, setTheme } = useTheme();

    return(
        <div className="">
            <Button onClick={()=> theme === "dark"? setTheme("light") :setTheme("dark") }>click ME</Button>
        </div>
    )
}