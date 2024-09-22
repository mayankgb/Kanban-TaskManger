import mongoose from "mongoose";

interface IUserSchema{
    userName:string,
    email:string,
    password:string,
    tasks:Array<mongoose.Types.ObjectId>    
}

 const UserSchema = new mongoose.Schema<IUserSchema>(
    {
        userName:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            trim:true
        },
        tasks:[{type:mongoose.Schema.Types.ObjectId,ref:"Tasks",default:[]}]
    },
    {timestamps:true}
)

export const User = mongoose.model("User",UserSchema)