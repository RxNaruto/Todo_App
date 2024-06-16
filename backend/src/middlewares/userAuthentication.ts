import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Request,Response,NextFunction } from "express";
import { CustomRequest } from "../types/CustomRequest";

interface DecodedToken{
    userId: string
}
export const userAuth = (req: CustomRequest,res: Response,next: NextFunction)=>{
    const token: any = req.headers.authorization;
    if(!token){
        return res.status(403).json({
            message: "you are not authorized"
        })
    }
    try {
        const decode : DecodedToken = jwt.verify(token,JWT_SECRET) as DecodedToken;
        
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "You are not authorized"
        })
    }


}