import { Request,Response,NextFunction } from "express";
import getProfile from "../utilites/profile";

type CheckPermissionOptions = {
    permissions: string[],
}

function CheckPermission(options: CheckPermissionOptions){
    return function (
        target: any, 
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const method = descriptor.value;
        descriptor.value = async function (req: Request, res: Response, next?: NextFunction) {
            const auth = req.body.auth;
            if (!auth) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const profile = await getProfile(auth.id);
            if (!profile) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // check if profile.permissions has all permissions in options.permissions
            const hasPermission = options.permissions.every((permission) => {
                return profile.permissions.includes(permission);
            });
            if (!hasPermission) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            return method.apply(this, [req, res, next]);
        };
    };
}

export default CheckPermission;