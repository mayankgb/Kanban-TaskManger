import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import { connectMongoose } from "./db/connect"
import { userRouter } from "./routes/userRoute"
import { TaskRouter } from "./routes/TaskRoute"

dotenv.config()

const app = express()
const port = 8000

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/user",userRouter)
app.use("/task",TaskRouter)



app.listen(port,async ()=>{
    await connectMongoose()
    console.log("app is listening")
})
