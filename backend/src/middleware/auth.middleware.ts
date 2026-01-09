import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";


export const verifyJWT = async(req:Request, res:Response, next:NextFunction)=>{

    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.split("")[1];

       
        const  {userId, role} = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET!) as JwtPayload


      
        req.userId = userId;
        req.role = role 
        next();
        
    } catch (error) {
        
    }
}