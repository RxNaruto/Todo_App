import { Router } from "express";
const userRouter = Router();

userRouter.get("/test",(req,res)=>{
    res.json({
        message: "user router"
    })
})

export default userRouter;