import dotenv from "dotenv"
dotenv.config();
import app from "./index";



import connectDB from "./db/db";


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



