import {  z } from "zod";

export const TodoSchema = z.object({
     title: z.string(),
     description: z.string().min(5),
     
})

export const updateTodoSchema = z.object({
    id: z.number(),
    title: z.string(),
     description: z.string().min(5)
 
})


