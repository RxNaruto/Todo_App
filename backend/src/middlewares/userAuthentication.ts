import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Request,Response,NextFunction } from "express";

interface DecodedToken{
    userId: string
}
export const userAuth = (req: Request,res: Response,next: NextFunction)=>{
    const token: any = req.headers.authorization;
    if(!token){
        return res.status(403).json({
            message: "you are not authorized"
        })
    }
    const decode : DecodedToken = jwt.verify(token,JWT_SECRET) as DecodedToken;
    const userId = decode.userId;
    next();


}