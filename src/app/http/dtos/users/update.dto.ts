// import Joi from "joi";
// import unique from "@core/rules/unique";
//
// const createDto = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string()
//         .email()
//         .required()
//         .custom((value, helper) => unique(value, helper, 'users', 'email')),
//     password: Joi.string().required(),
//     username: Joi.string().required(),
// });
// export  default  createDto;


import {Length, Min} from "class-validator";
import Unique from "@core/rules/unique";

class  updateDto{
    @Length(3,225)
    name:string;

    @Length(3,225)
    @Unique('users','email',{message: 'The email has already been taken.'})
    email:string;

    password:string;
    username:string;
}
export  default updateDto;