import db from "@/core/db"
import User from "@/app/models/User"
import { permissions, role_has_permissions, roles } from "../migrations"
import { eq } from "drizzle-orm";

const actions:any={
    'c':'create',
    'r':'read',
    'u':'update',
    'd':'delete'
}
const Roles=[
    "admin",
    "user"
];
const permissionsArr = [
    {
        "slug":User.permissionString,
        "permission":"c-r-u-d"
    }
];

const seedRoles = async () => {
    Roles.forEach(role=>{
         db.insert(roles).values({
            name:role
        }).execute()
    })
}
const seedPermissions = async () => {
    permissionsArr.forEach(permission=>{
        const permissionArray:string[] = permission.permission.split('-')
        permissionArray.forEach((action:string)=>{
            db.insert(permissions).values({
                name:actions[action]+'-'+permission.slug,
                group:permission.slug,
            }).execute()
        });
    })
}
const givePermissionToRole = async () => {
    const allPermissions = await db.select().from(permissions).execute()
    const role = await db.select().from(roles).where(eq(roles.name,'admin')).limit(1).execute()
    allPermissions.forEach(async (permission:any)=>{
        db.insert(role_has_permissions).values({
            role_id:role[0].id,
            permission_id:permission.id
        }).execute()
    })
}
const roleAndPermissionSeeder=()=>{
    // console.log("Seeding roles and permissions..")
    // console.log("Seeding roles..")
    // seedRoles()
    // console.log("Seeding permissions..")
    // seedPermissions()
    console.log("Giving permissions to admin role..")
    givePermissionToRole()
}

export default roleAndPermissionSeeder;