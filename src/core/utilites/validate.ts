import CreateDto from "@dto/users/create.dto";
import getErrorMessages from "@core/utilites/getErrorMessages";
import {Request, Response} from "express";
import {validate} from "class-validator";

const validateRequest = async (Dto:any,req:Request,res:Response) => {
    const dto = new Dto();
    const id = req.params.id;
    if (id){
        dto.id = id;
    }
    const keys = Object.keys(req.body);
    keys.forEach((key:string)=>{
        // @ts-ignore
        dto[key]=req.body[key];
    });
    const validation = await validate(dto);
    if (validation.length > 0){
        res.status(422).json({
            message: 'The given data was invalid.',
            errors: getErrorMessages(validation)
        })
        return  false;
    }
    return true;
}

export default  validateRequest;