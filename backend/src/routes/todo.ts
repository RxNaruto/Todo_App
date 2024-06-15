import { Router } from "express";
const todoRouter = Router();

todoRouter.get("/test",(req,res)=>{
    res.json({
        message: "todo router"
    })
})

export default todoRouter;