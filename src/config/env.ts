import 'dotenv/config'

export default {
    app_name: process.env.APP_NAME ??'Node API Starter',
    app_debug: process.env.APP_DEBUG === 'true',
    app_key: process.env.APP_KEY??null,

    // database
    db_connection: process.env.DB_CONNECTION??'mysql',
    db_host: process.env.DB_HOST??'127.0.0.1',
    db_port: process.env.DB_PORT ??'3306',
    db_database: process.env.DB_DATABASE??'node_api_starter',
    db_username: process.env.DB_USERNAME??'root',
    db_password: process.env.DB_PASSWORD??'',

    // email
    mail_driver: process.env.MAIL_DRIVER??'smtp',
    mail_host: process.env.MAIL_HOST??'smtp.mailtrap.io',
    mail_port: process.env.MAIL_PORT??2525,
    mail_username: process.env.MAIL_USERNAME??null,
    mail_password: process.env.MAIL_PASSWORD??null,
    mail_encryption: process.env.MAIL_ENCRYPTION??null,
    mail_from_address: process.env.MAIL_FROM_ADDRESS??null,
    mail_from_name: process.env.MAIL_FROM_NAME?? 'Node API Starter',

    // jwt
    jwt_secret: process.env.APP_KEY ??'',
    jwt_expiration: process.env.JWT_EXPIRATION??'30d',
    jwt_refresh_expiration: process.env.JWT_REFRESH_EXPIRATION??20160,

}