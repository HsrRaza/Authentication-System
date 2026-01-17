import { z} from "zod"


export const signSchema = z.object({
    name:z.string().trim(),
    email:z.email().trim(),
    password:z.string().trim().min(6,"password too short"),
    role:z.string().trim()
})

export const loginSchema = z.object({
    email:z.email().trim(),
    password:z.string().trim().min(6,"Password too short")
})

