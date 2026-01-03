import { Request, Response } from "express";
import { user } from "../models/user.model";
import { userVal } from "../lib/zod";
import bcrypt from "bcrypt"
import crypto from "crypto"


export const register = async (req: Request, res: Response) => {

    try {
        const data = userVal.parse(req.body);

        const checkUser = await user.findOne({ email: data.email });

        if (checkUser) {
            return res.status(400).json({
                sucess: false,
                message: "User already exits "
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const emailToken = crypto.randomBytes(18).toString("hex")


        const createNewUser = user.create({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
            
        })

        if (!createNewUser) {
            return res.status(404).json({
                success: false,
                message: "Unable to create new User"
            })
        }


        return res.status(201).json({
            sucess: true,
            message: "User created Sucessfully"
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong "
        })
    }


}

export const login = async (req: Request, res: Response) => {

}