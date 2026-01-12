import { Router } from "express"
import {
    register ,
    login,
     verifyEmail,
     forgetPassword,
     resetPassword,
     getMe,
     logout

} from "../controller/user.controllers"
import { authorize, protect } from "../middleware/auth.middleware"

const router = Router()

router.post("/register", register)
router.post("/login" , login)
router.get("/verifyemail/:token", verifyEmail)
router.post("/forgetpassword" , forgetPassword)
router.post("/reset/:userId/:token", resetPassword)


router.get("/me", protect ,authorize("admin" ,"user"), getMe)
router.post("/logout", protect, logout)


export default router