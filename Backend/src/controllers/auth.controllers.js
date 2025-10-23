import { asyncHandler } from "../utils/async-handler.js"
import { User } from "../models/user.models.js"
import { sendMail, emailVerificationMailGenContent, forgotPasswordMailGenContent } from "../utils/mail.js"

import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/ApiError.js"
import crypto from "crypto"
import dotenv from "dotenv"
dotenv.config();


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    // input validation 

    if (!email || !username || !password || !role) {
        throw new ApiError(400, "All fields required");

    }

    try {

        // finding an existing user

        const existingUser = await User.findOne({ email });


        if (existingUser) {
            throw new ApiError(404, "User Already Existed")
        };



        // creating a new User
        const newUser = await User.create({
            username,
            email,
            password,
            role,

        });

        // check user created or not
        if (!newUser) {
            throw new ApiError(500, "User Creation Error",)
        }

        // generate verifyToken


        const { hashedToken, unHashedToken, tokenExpiry } = await newUser.generateTemporaryToken();

        newUser.emailVerificationToken = hashedToken;
        newUser.emailVerificationExpiry = tokenExpiry;

        console.log("hashedToken : ", hashedToken);
        console.log("unhashedToken : ", unHashedToken);





        const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${unHashedToken}`

        const mailGenerateCon = emailVerificationMailGenContent(newUser.username, verificationUrl)


        // send  mail
        try {
            console.log("insdie try block sendmail");

            await sendMail({

                email: newUser.email,
                subject: "verify Your email",
                mailGenContent: mailGenerateCon,
            })
        } catch (error) {
            throw new ApiError(400, "Mail cannot send ", error)

        }



        await newUser.save();

        return res.status(200).json(
            new ApiResponse(200, {
                user: {
                    _id: newUser._id,
                    name: newUser.username,
                    email: newUser.email,
                    unhasedToken: unHashedToken
                }
            }, "user created ")
        )


    } catch (error) {
        console.error("registeration error", error);

        throw new ApiError(500, "User cannot registered something went wrong ", error)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new ApiError(404, "User doesn't existed ")
        }

        const isPassword = await user.isPasswordCorrect(password)

        if (!isPassword) {
            throw new ApiError(401, "Inavlid user crendtials")
        }

        // update user access token & refresh token

        const acessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // update user refresh token in db

        user.refreshToken = refreshToken;
        user.refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await user.save();

        const logedUser = await User.findById(user._id).select("-passsword -refreshToken")

        // set cookie

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",

        }

        return res
            .status(200)
            .cookie("accessToken", acessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: logedUser, acessToken,

                    },
                    "user logged in Successfully"
                )
            )










    } catch (error) {
        console.error("user cannot login", error);
        throw new ApiError(400, "something went wrong ")


    }


    // Validation
})
const logoutUser = asyncHandler(async (req, res) => {

    const userId = req._id
    try {

    } catch (error) {


    }

})
const verifyEmail = asyncHandler(async (req, res) => {
    const { verifyToken } = req.params;

    if (!verifyToken) {
        throw new ApiError(400, "verification token required")
    }


    const hashedToken = crypto.createHash("sha256").update(req.params.verifyToken).digest('hex')

    try {

        console.log("hashed TOken", hashedToken);

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpiry: { $gt: Date.now() },
        })

        if (!user) {
            throw new ApiError(404, "you are not registered yet")
        }

        user.isEmailVerified = true,
            user.emailVerificationToken = undefined;
        user.emailVerificationExpiry = undefined

        await user.save()

        const logedUser = await User.findById(user._id).select("-passsword -refreshToken")



        return res.status(200).json(
            new ApiResponse(200, {
                user: logedUser
            }, "email verified success")
        )
    } catch (error) {

        console.error("someting went wrong", error);
        throw new ApiError(500, "cannot verify")


    }





})
const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const refreshAcessToken = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const forgetPasswordRequest = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const changeCureentPassword = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const getCurrentUser = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})



export {
    registerUser,
    loginUser,
    verifyEmail,
    logoutUser,
    resendVerificationEmail,
    refreshAcessToken,
    forgetPasswordRequest,
    changeCureentPassword,
}