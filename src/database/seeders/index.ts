import roleAndPermissionSeeder from "./RoleAndPermissionSeeder"
import userSeeder from "./UserSeeder"

const databaseSeeder =async () => {
    console.log("Seeding database...")
    await Promise.all([
        roleAndPermissionSeeder(),
        userSeeder(),
    ])
    console.log("Seeding completed")
}

export default databaseSeeder;