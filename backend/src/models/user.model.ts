import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{

    },
    isVerified:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
    }
}, {timestamps:true})

export const user = mongoose.model("User", userSchema) ;