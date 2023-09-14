import db from "@/core/db"
import userFactory from "../factories/user.factory"
import {  users } from "@migration/users"
import * as bcrypt from "bcrypt"
import {assignRole} from "@core/utilites/role_and_permissions";

const userSeeder=async()=>{
    console.log("Seeding users...");
    // admin user seed
    const user= await db.insert(users).values({
        name: 'admin',
        email: 'admin@gmail.com',
        username: 'admin',
        password:bcrypt.hashSync('12345678', 10),
    }).execute()
    assignRole(user[0].insertId,'admin')

    // using factory
    for(let i = 0; i < 100; i++){
        console.log(`Seeding user ${i+1}...`);
        const userData = userFactory()
        const result = (await db.insert(users).values(userData).execute())[0]
        assignRole(result.insertId,'user')
    }
}

export default userSeeder;