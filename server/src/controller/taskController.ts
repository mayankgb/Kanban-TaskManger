import { Request, Response } from "express";
import { z } from "zod";
import { Task } from "../models/TaskModel";
import { User } from "../models/userModel";
const taskSchema = z.object({
    title:z.string().min(1),
    description:z.string().min(1).optional(),
    priority:z.enum(['Low','High','Medium']),
    status:z.enum(["ToDo","In Progress","Completed"]),
    dueDate:z.string().optional()
})

export const createTask = async (req: Request, res: Response) => {
    try {
        const parsedBody = taskSchema.safeParse(req.body.todoInput);

        const userId =  res.locals.userId;

        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Invalid inputs",
                error: parsedBody.error,
            });
        }
        const date = new Date(req.body.todoInput.dueDate)
        if (isNaN(date.getTime())) {
            return res.status(400).send({ message: 'Invalid date format' });
          }

        if (!userId) {
            return res.status(400).json({
                message: "User ID is missing",
            });
        }

        const newTask = new Task({
            title: parsedBody.data.title,
            description: parsedBody.data.description,
            priority: parsedBody.data.priority,
            status: parsedBody.data.status,
            dueDate: date,
            user: userId,  
        });

        const savedTask = await newTask.save();

        await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

        res.status(200).json({
            savedTask,
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "Something went wrong",
        });
    }
};

export const updatetask = async(req:Request, res:Response)=>{
    try{
        const userId = res.locals.userId;
        const taskId = req.params.id
        const status = req.body.status
        const task = await Task.findById({_id:taskId})

        if (!task) {
            return res.status(403).json({
                message:"task not found"
            })
        }

        if (!task?.user === userId) {
            return res.status(403).json({
                message:"invalid request"
            })
        }

        
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {status:status},
            {new:true, runValidators:true}
        )

        return res.status(200).json({
            updatedTask
        })
    }catch(e){
        console.log(e)
        return res.status(400).json({
            message:"something went wrong"
        })
    }
}

export const getAllTask = async(req:Request,res:Response)=>{
    try {
        const userId = res.locals.userId
        const allTask = await Task.find({
            user:userId
        })
        
        if (!allTask.length) {
            return res.status(200).json({
                message:"No task present"
            })
        }
        
        return res.status(200).json({
            allTask
        })

    }catch(e){
        console.log(e)
        return res.status(400).json({
            message:"something went wrong"
        })
    }
}

export const deleteTask = async (req:Request, res:Response)=>{
    try{
        const userId = res.locals.userId
        const taskId = req.params.id

        const task = await Task.findOneAndDelete({
            user:userId,
            _id:taskId
        })

        if (!task) {
            return res.status(403).json({
                message:"Invalid task"
            })
        }
        return res.json({
            id:task.id
        })

    }catch(e){
        console.log(e)
        return res.status(400).json({
            message:"Something went wrong"
        })
    }
}

export const updateFullTask = async(req:Request, res:Response)=>{
    try{
        const userId = res.locals.userId;
        const taskId = req.params.id
        const task = await Task.findById({user:userId,_id:taskId})

        const parsedBody = taskSchema.safeParse(req.body.todoInput);

        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Invalid inputs",
                error: parsedBody.error,
            });
        }
        const date = new Date(req.body.todoInput.dueDate)
        if (isNaN(date.getTime())) {
            return res.status(400).send({ message: 'Invalid date format' });
          }

        if (!task) {
            return res.status(403).json({
                message:"task not found"
            })
        }

        
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                title:parsedBody.data.title,
                description:parsedBody.data.description,
                status:parsedBody.data.status, 
                priority:parsedBody.data.priority,
                dueDate:date

            },
            {new:true, runValidators:true}
        )

        return res.status(200).json({
            updatedTask
        })
    }catch(e){
        console.log(e)
        return res.status(400).json({
            message:"something went wrong"
        })
    }
}