import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                message: "You are not logged in",
            });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET!);

        if (!verify) {
            res.clearCookie("token");
            return res.status(400).json({
                message: "Invalid token",
            });
        }
        res.locals.userId = (verify as any).id;

        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server error",
        });
    }
};
