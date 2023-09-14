import CrudController from '@core/class/CurdController';
import User from "@model/User";
import CreateDto from "@dto/users/create.dto";
import UserResponse from "@/app/http/responses/UserResponse";
import { NextFunction,Response,Request } from 'express';
import CheckPermission from '@/core/express-decoraters/checkPermission';


class UserController extends CrudController {
    table = User.table;
    model = User;
    createDto = CreateDto;
    updateDto = CreateDto;
    response = new UserResponse;

    @CheckPermission({
        permissions: ['read-users']
    })
    async index(req: Request, res: Response, next: NextFunction) {
        return super.index(req, res, next);
    }

    @CheckPermission({
        permissions: ['create-users']
    })
    async create(req: Request, res: Response, next: NextFunction) {
        return super.create(req, res, next);
    }

    @CheckPermission({
        permissions: ['read-users']
    })
    async show(req: Request, res: Response, next: NextFunction) {
        return super.show(req, res, next);
    }

    @CheckPermission({
        permissions: ['update-users']
    })
    async update(req: Request, res: Response, next: NextFunction) {
        return super.update(req, res, next);
    }

    @CheckPermission({
        permissions: ['delete-users']
    })
    async delete(req: Request, res: Response, next: NextFunction) {
        return super.delete(req, res, next);
    }
    
}
export default new UserController;