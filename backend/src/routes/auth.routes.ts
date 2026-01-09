import { Router } from "express"
import {
    register ,
    login,
     verifyEmail,
     forgetPassword,
     resetPassword

} from "../controller/user.controllers.js"

const router = Router()

router.post("/register", register)
router.post("/login" , login)
router.get("/verifyemail", verifyEmail)
router.post("/forgetpassword" , forgetPassword)
router.post("/reset/:userId/:token", resetPassword)


export default router