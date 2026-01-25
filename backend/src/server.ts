import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import connectDB from "./db/db";
import express from "express"
import cookieParser from "cookie-parser";

const app = express()


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]

  }))


const port = process.env.PORT || 5005


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// router imports
import authRouter from "./routes/auth.routes"

// console.log(authRouter);

app.use("/api/v1/user" , authRouter)






connectDB()
  .then(() => {

    app.listen(port, () => {
      console.log(`Server is running on ${port}`);

    })
  })
  .catch((err) => {
    console.error("MongoDb connection error", err)
    process.exit(1)
  })



