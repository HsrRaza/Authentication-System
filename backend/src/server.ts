import dotenv from "dotenv"
dotenv.config();
import app from "./index";
import cors from "cors"


import connectDB from "./db/db";


app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true,
  methods:["GET", "POST","PUT", "DELETE"]

}))


const port = process.env.PORT || 5005



connectDB()
  .then( ()=>{

      app.listen(port, ()=>{
          console.log(`Server is running on ${port}`);
          
      })
  })
  .catch( (err)=>{
    console.error("MongoDb connection error", err)
    process.exit(1)
  })



