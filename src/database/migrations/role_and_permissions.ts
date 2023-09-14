import { relations } from 'drizzle-orm';
import { datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
 

const roles = mysqlTable('roles', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 256 }),
    created_at: datetime('created_at').default(new Date()),
    updated_at: datetime('updated_at'),
});

const permissions = mysqlTable('permissions', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 256 }),
    group: varchar('group', { length: 256 }).unique(),
    created_at: datetime('created_at').default(new Date()),
    updated_at: datetime('updated_at'),
});

const role_has_permissions = mysqlTable('role_has_permissions', {
    id: int('id').autoincrement().primaryKey(),
    role_id: int('role_id'),
    permission_id: int('permission_id')
});
const user_has_roles = mysqlTable('user_has_roles', {
    id: int('id').autoincrement().primaryKey(),
    role_id: int('role_id'),
    user_id: int('user_id')
});

const roleRelations = relations(roles,({one,many}) => ({
   permissions:many(role_has_permissions)
}));

const permissionRelations = relations(permissions,({one,many}) => ({
    roles:many(role_has_permissions)
}));


export { roles, permissions, role_has_permissions ,roleRelations,permissionRelations,user_has_roles};