import z from "zod"

export const userVal = z.object({
    name:z.string(),
    email:z.email(),
    password:z.string(),
    role:z.string(),
})