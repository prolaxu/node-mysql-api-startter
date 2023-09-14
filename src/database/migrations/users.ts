import { datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { user_has_roles } from './role_and_permissions';
import { relations } from 'drizzle-orm';
 

const users = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    name: varchar('name', { length: 256 }),
    email: varchar('email', { length: 256 }).unique(),
    username: varchar('username', { length: 256 }).unique(),
    password: varchar('password', { length: 256 }),
    created_at: datetime('created_at').default(new Date()),
    updated_at: datetime('updated_at'),
});

const userRelations = relations(users,({many}) => ({
    roles:many(user_has_roles)
}));

// type User = typeof users.$inferSelect;
// type NewUser = typeof users.$inferInsert;

export { users,userRelations };