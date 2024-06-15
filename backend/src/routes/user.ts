import { Router } from "express";
import { PrismaClient } from "@prisma/client";
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
     if(user){
         res.status(200).json({
             message: "signup complete"
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


export default userRouter;