import db from "@core/db";
import {and, eq, sql} from "drizzle-orm";
import {role_has_permissions, roles,permissions, user_has_roles} from "@database/migrations";


const checkRole =async (userId:number,role: string) => {
    const { count } = (await db
                            // count
                            .select({count: sql<number>`count(*)`})
                            .from(roles)
                            .innerJoin(user_has_roles, eq(roles.id, user_has_roles.role_id))
                            .where(and(eq(user_has_roles.user_id,userId),eq(roles.name,role)))
                            .execute())[0];
    return count > 0;
}
const checkPermission =async (userId:number, permission: string) => {
    const { count } = (await db
                            // count
                            .select({count: sql<number>`count(*)`})
                            .from(permissions)
                            .innerJoin(role_has_permissions, eq(permissions.id, role_has_permissions.permission_id))
                            .innerJoin(user_has_roles, eq(role_has_permissions.role_id, user_has_roles.role_id))
                            .where(and(eq(user_has_roles.user_id,userId),eq(permissions.name,permission)))
                            .execute())[0];
    return count > 0;
}

const getPermissions = async (userId:number) => {
    const records = await db
                            .select()
                            .from(permissions)
                            .innerJoin(role_has_permissions, eq(permissions.id, role_has_permissions.permission_id))
                            .innerJoin(user_has_roles, eq(role_has_permissions.role_id, user_has_roles.role_id))
                            .where(eq(user_has_roles.user_id,userId))
                            .execute();
    return records.map((item:any)=>item.permissions.name);
}
const getRoles = async (userId:number) => {
    const records = await db
                            .select()
                            .from(roles)
                            .innerJoin(user_has_roles, eq(roles.id, user_has_roles.role_id))
                            .where(eq(user_has_roles.user_id,userId))
                            .execute();
    return records.map((item:any)=>item.roles.name);
}

const assignRole = async (userId:number,role: string) => {
    try {
        const roleRecord = (await db.select().from(roles).where(eq(roles.name,role)).execute())[0];
        await db.insert(user_has_roles).values({
            user_id:userId,
            role_id:roleRecord.id
        }).execute()
        return true;
    } catch (error) {
        return false;
    }
}

export {
    checkRole,
    checkPermission,
    getPermissions,
    getRoles,
    assignRole
};