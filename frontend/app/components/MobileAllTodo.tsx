"use client"

import { motion } from "framer-motion"
import { TaskBar } from "./TaskBar"
import { AllTasks } from "./AllTask"

export function MobileAllTodo() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }} // Start with blur and smaller scale
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1}}    // Animate to full size and clarity
      transition={{ duration:0.3, ease: "easeOut" }}            // Smooth easing, no bounce
      className="h-screen  w-full p-2 "
    >
      <TaskBar />
      <AllTasks />
    </motion.div>
  )
}
