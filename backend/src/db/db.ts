import mongoose from "mongoose";

const connectDB = async( )=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Mongoose Db  connected");
        
    } catch (error) {
        console.error("mongo connection  failed" , error)
        process.exit(1)
    }
}

export default connectDB