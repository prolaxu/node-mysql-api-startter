import { users } from "@/database/migrations/users";
import db from "@core/db";
import {eq} from "drizzle-orm";
import { getPermissions, getRoles } from "./role_and_permissions";

const getProfile=async (userId:number)=>{
    const user = (await db.select().from(users).where(eq( users.id,userId))
                        .execute())[0];
    return  {
        id:user.id,
        username:user.username,
        email:user.email,
        roles:await getRoles(user.id),
        permissions: await getPermissions(user.id)
    }
}

export default getProfile;