import {Length} from "class-validator";
import Exist from "@core/rules/exists";

class  loginDto{

    @Length(3,225)
    @Exist('users','username',{message: 'The username does not exist.'})
    username:string;

    @Length(3,225)
    password:string;
}
export  default loginDto;