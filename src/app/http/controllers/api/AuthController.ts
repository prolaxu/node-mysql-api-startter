import Controller from "@core/class/Controller";
import {Request,Response,NextFunction} from "express";
import db from "@core/db";
import {users} from "@migration/users";
import validateRequest from "@core/utilites/validate";
import loginDto from "@dto/loginDto";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "@config/env";
import {eq} from "drizzle-orm";
import {getPermissions, getRoles} from "@core/utilites/role_and_permissions";

class AuthController extends Controller {
    login = async (req: Request, res: Response, next: NextFunction) => {
        if (!await validateRequest(loginDto,req,res))  return ;
        const {
            username,
            password
        } = req.body;
        const user = (await db.select()
                            .from(users)
                            .where(eq( users.username,username))
                        .execute())[0];
        const passwordMatch = await bcrypt.compare(password, user.password??'');
        if (!passwordMatch) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        const token = jwt.sign(
                {id: user.id},
                env.jwt_secret??'',
                {expiresIn: env.jwt_expiration}
        );
        return res.json({
            message: "Login successfully",
            data: {
                token,
            }
        });
    }

    profile = async (req: Request, res: Response, next: NextFunction) => {
        const user = (await db.select()
                            .from(users)
                            .where(eq( users.id,req.body.auth.id))
                        .execute())[0];
        return res.json({
            message: "Profile",
            data: {
                id:user.id,
                username:user.username,
                email:user.email,
                roles:await getRoles(user.id),
                permissions: await getPermissions(user.id)
            }
        });
    }

}

export default new AuthController();