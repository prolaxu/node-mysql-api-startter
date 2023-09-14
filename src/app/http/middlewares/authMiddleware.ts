import env from "@/config/env";
import { NextFunction,Response,Request } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, env.jwt_secret??'');
        console.log(decoded)
        req.body.auth = decoded;
        next();
    } catch (e: any) {
        return res.status(401).json({
            message: e.message,
        });
    }
}
export default authMiddleware;