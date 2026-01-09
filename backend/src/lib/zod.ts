import z from "zod"

export const registerSchema = z.object({
    name:z.string(),
    email:z.email(),
    password:z.string(),
    role:z.string(),
})
export const loginSchema = z.object({
    email:z.email(),
    password:z.string()
})