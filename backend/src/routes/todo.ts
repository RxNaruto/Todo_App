import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { userAuth} from "../middlewares/userAuthentication";
import { CustomRequest } from "../types/CustomRequest";
import { TodoSchema, updateTodoSchema } from "../types/todoTypes";
const todoRouter = Router();
const prisma = new PrismaClient();
interface todoPost{
    title: string;
    description: string;

    

}
todoRouter.post("/",userAuth,async(req:CustomRequest,res)=>{
    const body: todoPost = req.body;
    const {success} = TodoSchema.safeParse(body);
    if(!success){
        return res.status(401).json({
            message: "Incorrect inputs at post"
        })
    }
    try {
        const todo = await prisma.todo.create({
            data: {
                title: body.title,
                description: body.description,
                authorId: req.userId as number
            }
        })
      
        res.status(200).json({
                message: "todo added",
                 todo: todo.id
            })
      
    } catch (e){
        return res.status(500).json({
            message: "internal server error"
        })
        
    }
})

interface todoUpdate{
    id: number;
    title: string;
    description: string;
}
todoRouter.put("/update",userAuth,async(req,res)=>{
    const body: todoUpdate = req.body;
    const {success} = updateTodoSchema.safeParse(body);
    if(!success){
        return res.status(401).json({
            message: "Incorrect inputs"
        })
    }
    try {
        const todo = await prisma.todo.update({
            where:{
                id: body.id
            },
            data: {
                 title: body.title,
                 description: body.description
            }
        })
        res.status(200).json({
            message: "todo updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        })
        
    }
})    

todoRouter.get("/alltodo",userAuth,async(req:CustomRequest,res)=>{
    const userId = req.userId
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select:{
                todo:true
            }
        })
        if(!user){
            res.status(500).json({
                message: "internal Server error"
            })
        }
        res.status(200).json({
             user
        })
    } catch (error) {
        res.status(500).json({
            message: "internal Server error"
        })
        
    }
})

export default todoRouter;