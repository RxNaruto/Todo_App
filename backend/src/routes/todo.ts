import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { userAuth } from "../middlewares/userAuthentication";
const todoRouter = Router();
const prisma = new PrismaClient();
interface todoPost{
    title: string;
    description: string;
    authorId: any;
    

}
todoRouter.post("/",userAuth,async(req,res)=>{
    const body: todoPost = req.body;
    try {
        const todo = await prisma.todo.create({
            data: {
                title: body.title,
                description: body.description,
                authorId: 1
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