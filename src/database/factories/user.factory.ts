import { randEmail, randFullName, randUserName } from "@ngneat/falso"
import * as bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';

export default ()=>{
    const name = randFullName();
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    return{
        name: name,
        email: randEmail({
            firstName,
            lastName
        }),
        username: randUserName({
            firstName,
            lastName
        }),
        password: bcrypt.hashSync(uuid(), 10)
    }
}