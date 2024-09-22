import express from "express"
import { logout, me, ping, signIn, signUp } from "../controller/userController"

export const userRouter = express.Router()

userRouter.post("/signin",signIn)
userRouter.post("/signup",signUp)
userRouter.get("/me",me)
userRouter.post("/logout",logout)
userRouter.get("/ping",ping)