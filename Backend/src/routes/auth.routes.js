import { Router } from "express";

import {validate} from '../middlewares/validator.middlewares.js'
import {userRegistrationValidator, userLoginValidator} from '../validators/index.js'

import {
    registerUser,
    loginUser,
    verifyEmail,
    logoutUser,
    resendVerificationEmail,
    refreshAcessToken,
    forgetPasswordRequest,
    changeCureentPassword
} from "../controllers/auth.controllers.js"

const router = Router()

router.route("/register").post(userRegistrationValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(),validate,  loginUser)
router.route("/verify/:verifyToken").get(verifyEmail)
router.route("/logout/:id").get(logoutUser)
router.route("/").get(logoutUser)


export default router
