import { users } from "@/database/migrations";
import Model from "@core/class/Model";
import * as bcrypt from "bcrypt";

class User extends Model{
    table = users;
    permissionString = 'users';
    fillables:string[] = [
        'name',
        'email',
        'username',
        'password'
    ];

    hidden:string[] = [
        'password'
    ]


    beforeCreate = async (fillable:any,tx:any)=>{
        console.log("before create")
        fillable.password = await bcrypt.hash(fillable.password,10);
        return fillable;
    }
    beforeUpdate = async (fillable:any,tx:any)=>{
        console.log("before update")
        if (fillable.password){
            fillable.password = await bcrypt.hash(fillable.password,10);
        }
        return fillable;
    }

}

export default new User;