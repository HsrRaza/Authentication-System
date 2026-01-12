import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";



interface JwtPayload {
    userId: string;
    role:string
}

export interface AuthRequest extends Request {
    user?: any;
}


export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {

    try {
        console.log("taking token");


        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
        console.log("token : ", token);



        if (!token) {
            return res.status(401).json({
                success: "false",
                message: "Not authencticated"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload


        console.log("decoded token:", decoded);
        console.log("decoded.id:", decoded.userId);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User no Longer exists" })
        }



        req.user = user;


        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token " })

    }
}

export const authorize = (...allowedRoles: String[]) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Not authenticated"
            })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You are not allowed to access"
            })
        }

        next();
    }