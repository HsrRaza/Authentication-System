import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"


dotenv.config({
    path: "./.env"
})
const PORT = process.env.PORT || 8000

// 1. Cookie Parser first
app.use(cookieParser());


// cors configuration

app.use(cors({
    origin: "http://localhost:5173", // match your frontend URL exactly
    Credential: true,
    methods: ['GET', 'POST', 'PUT' , 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders:['Set-Cookie', '*']
}));


// othermiddlewares
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.static("public"))



connectDB()
   .then( ()=>{
    app.listen(PORT, ()=> console.log(`Server is running on port : ${PORT}`));
   })
   .catch( ( err) => {
    console.error("Mongodb Connection error", err);
    process.exit(1)
    
   });
