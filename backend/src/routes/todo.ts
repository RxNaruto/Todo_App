import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuthentication";
import { CustomRequest } from "../types/CustomRequest";
const todoRouter = Router();
const prisma = new PrismaClient();
interface todoPost{
    title: string;
    description: string;

    

}
todoRouter.post("/",userAuth,async(req:CustomRequest,res)=>{
    const body: todoPost = req.body;
    try {
        const todo = await prisma.todo.create({
            data: {
                title: body.title,
                description: body.description,
                authorId: req.userId as number
            }
        })
        if(todo){
            res.status(200).json({
                message: "todo added"
            })
        }
        else{
            return res.status(500).json({
                message: "Internal Server error"
            })
        }
    } catch (e){
        return res.status(500).json({
            message: "internal server error"
        })
        
    }
})

export default todoRouter;