import express from "express"
import { createTask, deleteTask, getAllTask, updateFullTask, updatetask } from "../controller/taskController"
import { authMiddleware } from "../middleware/verify"

export const TaskRouter = express.Router()

TaskRouter.post("/create",authMiddleware,createTask)
TaskRouter.get("/getAllTask",authMiddleware,getAllTask)
TaskRouter.put("/update/full/:id",authMiddleware, updateFullTask)
TaskRouter.put("/update/:id",authMiddleware,updatetask)
TaskRouter.delete("/delete/:id",authMiddleware,deleteTask)

