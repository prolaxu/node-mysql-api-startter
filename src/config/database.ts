import env from "./env";

export default {
    user: env.db_username,
    password: env.db_password,
    host: env.db_host,
    port: parseInt(env.db_port),
    database: env.db_database,
}