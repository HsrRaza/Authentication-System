import express, { Request, Response } from "express"

const app= express();

app.get("/", (req:Request , res:Response)=>{
   res.send("server is running just fine !")
})

export default app