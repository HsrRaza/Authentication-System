import app from "./index";
import connectDB from "./db/db";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import express from "express"

dotenv.config()


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const port = process.env.PORT || 5005



connectDB()
  .then( ()=>{

      app.listen(port, ()=>{
          console.log(`Server is running on ${port}`);
          
      })
  })



