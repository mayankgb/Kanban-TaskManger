import mongoose from "mongoose";


export async function connectMongoose(){
    console.log(process.env.URL)
    try{
        await mongoose.connect(process.env.URL!,{
            dbName:"kanban"
        })

        console.log("connected")
    }catch(e){
        console.log(e)
        console.log("disconnected")
    }
}