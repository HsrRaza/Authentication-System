import { Request, Response } from "express";
import { User } from "../models/user.model";
import { registerSchema, loginSchema } from "../lib/zod";
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"


const generateAcessToken = (payload: { userId: string, role: string }) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined")
    }
    return jwt.sign(payload, secret, {
        expiresIn: "15m"
    })
}

export const register = async (req: Request, res: Response) => {

    try {
        const data = registerSchema.parse(req.body);

        const checkUser = await User.findOne({ email: data.email });

        if (checkUser) {
            return res.status(400).json({
                sucess: false,
                message: "User already exits "
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const emailToken = crypto.randomBytes(18).toString("hex")


        const createNewUser = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
            emailVerificationToken: emailToken,
            emailTokenExp: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h 

        })

        if (!createNewUser) {
            return res.status(404).json({
                success: false,
                message: "Unable to create new User"
            })
        }


        return res.status(201).json({
            sucess: true,
            message: "SignUp Sucessfully. Please verify your email",
            createNewUser
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong "
        })
    }


}

export const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;

    try {
        const data = await User.findOne({
            emailVerificationToken: token,
            emailTokenExp: { $gt: new Date() }
        });

        if (!data) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid or expired Tokens"
            })
        }

        data.isVerified = true;
        data.emailVerificationToken = undefined;
        data.emailTokenExp = undefined;
        await data.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Something went wrong"
        })
    }
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = loginSchema.parse(req.body);

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                sucess: false,
                message: "Invalid Credentials"
            })
        }

        if (!user.isVerified) {
            return res.status(403).json({
                sucess: false,
                message: "Email Not verified"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                sucess: false,
                message: "Invalid Credentials"
            })
        }

        const accessToken = generateAcessToken({
            userId: user._id.toString(),
            role: user.role,
        })

        const refreshToken = crypto.randomBytes(32).toString("hex")


        user.refreshToken = refreshToken;
        user.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await user.save();

        res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
            })
            .status(200)
            .json({
                sucess: true,
                message: " user logged In SucessFully",
                accessToken
            })

    } catch (error) {

    }

}

export const forgetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "If an account an exist , a reset link has been sent"
            })

        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        // store token and exp  in db

        user.forgetPassToken = resetToken;
        user.forgetPassExp = new Date(Date.now() + 15*60*1000)   // 15min
 
        await user.save()

        //  reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${resetToken}`;

        // send mail 


        res.status(200).json({
            success:true,
            message:"Password  reset Link  sent to  your email "
        })

    } catch (errr) {
        res.status(500).json({
            sucess:false,
            message:"Something went wrong "
        })

    }
}

export const resetPassword = async(req: Request , res:Response) =>{

   try {
     const {userId , token} = req.params
     const {password} = req.body
 
     //  check user
 
     const user = await User.findById(userId);
 
     if(!user){
         return res.status(404).json({
             success:false,
             messsage:"Invalid User"
         })
     }
 
     //  validate token
     if(user.forgetPassToken !=token ||  !user.forgetPassExp || user.forgetPassExp.getTime() < Date.now() ){
          return res.status(400).json({
             success:false,
             message:" Invalid or expired link "
          })
     }
 
     //  hash password
 
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password , salt);
 
     // invalidate token
 
     user.forgetPassToken = null;
     user.forgetPassExp =  null;
 
     await user.save()
 
     return res.status(200).json({
        sucess:true,
        message:'Password reset successfull'
     })


   } catch (error) {
    console.error(error);
    return res.status(500).json({
        success:false ,
        message:"Something went wrong"})
   }
}

export const logout = async(req:Request , res:Response) =>{
    
}