import express, { Request, Response } from "express"

const app= express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// router imports
import authRouter from "./routes/auth.routes"
app.use("/api/v1/user" , authRouter)


app.get("/", (req:Request , res:Response)=>{
   res.send("server is running just fine !")
})

export default app