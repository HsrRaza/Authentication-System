import mongoose, { Schema } from "mongoose";


interface IUser {
    _id?:string,
    name:string,
    email:string,
    password:string,
    role:string,
    isVerified:boolean,
    forgetPassToken:string | undefined | null,
    forgetPassExp:Date | null,
    emailVerificationToken:string | undefined | null,
    emailTokenExp:Date | null,
    refreshToken:string | undefined | null,
    refreshTokenExpiry:Date | null,
    isActive:boolean

}



const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default:"user"
    },
    isVerified: {
        type: Boolean,
        default:false
    },

// password reset
    forgetPassToken: {
        type: String
    },
    forgetPassExp: {
        type: Date
    },

 // email verify
    
    emailVerificationToken: {
        type: String
    },
    emailTokenExp: {
        type: Date
    },

// session control

    refreshToken: {
        type: String
    },
    refreshTokenExpiry:{
        type:Date
    },

    // soft delete
    isActive: {
        type: Boolean,
    }
}, { timestamps: true })

export const User = mongoose.model<IUser>("User", userSchema);