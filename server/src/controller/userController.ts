import {Request, Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {z} from "zod"
import { User } from "../models/userModel";
import { Task } from "../models/TaskModel";

const signUpSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    userName:z.string(),
})

const signInSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const signUp = async (req:Request,res:Response)=>{
    const body = req.body

    try{

        const parsedBody = signUpSchema.safeParse(body)

        if (!parsedBody.success) {
            return res.status(400).json({
                message:"invalid inputs",
                error:parsedBody.error
            })
        }

        const existingUser = await User.findOne({
            email:parsedBody.data.email
        },
    )

        if(existingUser){
            return res.status(400).json({
                message:"user is already present"
            })
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(parsedBody.data.password,salt)

        const newUser = await User.create({
            email:parsedBody.data.email,
            password:hashedPassword,
            userName:parsedBody.data.userName
        })
        const categories = [{
            category:"ToDo",
            priority:"Low",
        },{
            category:"In Progress",
            priority:"Medium",
        },{
            category:"Completed",
            priority:"High",
        },];

        for (const category of categories) {
          const newTask = await Task.create({
            title: `Sample ${category.category} task`,
            description: `This is a sample ${category.priority} task.`,
            status: category.category,
            user: newUser._id,
            priority: category.priority,
          });
          const savedTask = await newTask.save()
          await User.findByIdAndUpdate(newUser._id,{$push:{tasks:savedTask._id}})
        }


        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET!)
        res.cookie('token', token)

        res.status(200).json({
            message:"account created successfully"
        })

    }catch(e){
        console.log(e)
        return res.status(400).json({
            message:"something went wrong"
        })
    }

}

export const signIn = async(req:Request, res:Response) => {
    const body = req.body

    try{
        const parsedBody = signInSchema.safeParse(body.loginData)

        if (!parsedBody.success) {
            return res.status(400).json({
                message:"invalid inputs",
                erorr:parsedBody.error
            })
        }
        const existingUser = await User.findOne({
            email:parsedBody.data.email
        })

        if (!existingUser) {
            return res.status(404).json({
                message:"user not found"
            })
        }
        const password = await bcrypt.compare(parsedBody.data.password, existingUser.password)

        if (!password) {
            return res.status(400).json({
                message:"password incorrect"
            })
        }

        const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET!)
        res.cookie('token', token)

        return res.status(200).json({
            message:"logged in!"
        })

    }catch(e){
        return res.status(400).json({
            message:"something went wrong"
        })
    }
}

export const logout= async (req:Request, res:Response)=>{
    try{
        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({
                message:"invalid request"
            })
        }

        res.clearCookie("token")
        return res.status(200).json({
            message:"logged out!"
        })
    }catch(e){
        return res.status(400).json({
            message:"something went wrong"
        })
    }
}

export const me = async (req:Request, res:Response)=>{
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message:"token is not present"
        })
    }

    const verify = jwt.verify(token.toString(),process.env.JWT_SECRET!)
    if (!verify) {
        res.clearCookie("token")
        return res.status(400).json({
            message:"user not logged in"
        })
    }
    
    return res.json({
        message:"welcome back "
    })

}

export const ping = async(req:Request, res:Response)=>{
    return res.json({
        message:"working"
    })
}