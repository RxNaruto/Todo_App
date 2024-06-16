import {  z } from "zod";

export const SignupSchema = z.object({
     username: z.string().email(),
     password: z.string().min(5),
     name: z.string()
})

export const SigninSchema = z.object({
    username: z.string().email(),
    password: z.string().min(5),
 
})


