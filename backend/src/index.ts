import express, { Request, Response } from "express"
import cookieParser from "cookie-parser"

const app= express();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// router imports
import authRouter from "./routes/auth.routes"
// console.log(authRouter);

app.use("/api/v1/user" , authRouter)


app.get("/", (req:Request , res:Response)=>{
   res.send("server is running just fine !")
})

export default app