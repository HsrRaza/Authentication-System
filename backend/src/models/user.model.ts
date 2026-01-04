import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
        type: String
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

export const User = mongoose.model("User", userSchema);