"use client"

import { AllTasks } from "./AllTask";
import { motion} from "framer-motion"
import { TaskBar } from "./TaskBar";

export function SideBar(){

    return (
       
            <motion.div layout className="h-screen hidden lg:block overflow-auto max-h-screen bg-neutral-900 w-[35%]">
                <TaskBar/>
                <div className="p-2 ">
                <AllTasks/>
                </div>
            </motion.div>
    )
}