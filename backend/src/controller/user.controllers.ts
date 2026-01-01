import { Request, Response } from "express";
import { user } from "../models/user.model";
import { userVal } from "../lib/zod";


export const register = async(req:Request, res:Response)=>{
 
    try {
        const data  =  userVal.parse(req.body);

        const checkUser = await user.findOne({email:data.email});

        if(checkUser){
            return res.status(400).json({
                sucess:false,
                message:"User already exits "
            })
        }
        
    } catch (error) {
        
    }


}