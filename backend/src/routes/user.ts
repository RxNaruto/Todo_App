import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { userAuth } from "../middlewares/userAuthentication";
import { CustomRequest } from "../types/CustomRequest";
const userRouter = Router();
const prisma = new PrismaClient();

interface signupBody {
    username: string;
    password: string;
    name: string;
}

userRouter.post("/signup", async (req, res) => {
    const body: signupBody = req.body;
    const checkUser = await prisma.user.findFirst({
        where: {
            username: body.username
        }
    })
    if(checkUser){
        return res.status(404).json({
            msg: "user already exist"
        })
    }
    else{
   try {
     const user = await prisma.user.create({
         data: {
             username: body.username,
             password: body.password,
             name: body.name
         }
 
     })
     const token = jwt.sign({userId: user.id},JWT_SECRET)
     if(user){
         res.status(200).json({
             message: "signup complete",
             token: token
         })
     }
     else{
         res.status(500).json({
             message: "internal Server error"
         })
     }
   } catch (error) {
    res.status(500).json({
        message: "internal server error"
    })
    
   }
}
})

interface signinBody{
    username: string;
    password: string;
}
userRouter.post("/signin",async(req,res)=>{
    const body: signinBody = req.body;
    try{
        const user = await prisma.user.findFirst({
            where:{
                username: body.username,
                password: body.password
            }
        })
        if(!user){
            return res.status(404).json({
                message: "Incorrect details"
            })
        }
        else{
            const token = jwt.sign({userId: user.id},JWT_SECRET)
            res.status(200).json({
                message: "signin complete",
                token: token
            })
        }
    }catch(error){
        return res.status(500).json({
            message: "internal server error"
        })
    }
})


export default userRouter;