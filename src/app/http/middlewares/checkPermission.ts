import env from "@/config/env";
import { NextFunction,Response,Request } from "express";
import jwt from "jsonwebtoken";

const checkPermissionMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<NextFunction> => {
    const auth = req.body.auth ;
    if (!auth) {
        return res.status(401).json({message: 'Unauthorized'});
    }
}
export default checkPermissionMiddleware;