import z from "zod"

const user = z.object({
    name:z.string(),
    email:z.email(),
    password:z.string(),
    role:z.string(),
})