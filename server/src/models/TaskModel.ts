import mongoose from "mongoose";

interface ITaskSchema{
    title:string,
    description?:string,
    status:string,
    priority:"Low"|"Medium"|"High",
    user:mongoose.Types.ObjectId
    dueDate?:Date
}


const TaskSchema =  new mongoose.Schema<ITaskSchema>(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        priority:{
            type:String,
            enum:['Low','High','Medium'],
            required:true,
        },
        dueDate:{
            type:Date,
        },
        status:{
            type:String,
            enum:["ToDo","In Progress","Completed"],     
            required:true                   
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {timestamps:true}
)

export const Task = mongoose.model("Task",TaskSchema)


