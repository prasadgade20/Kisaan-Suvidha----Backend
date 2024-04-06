module.exports = {
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DB: process.env.DATABASE_DB,
    DIALECT: process.env.DATABASE_DIALECT,
    pool: {
        max: parseInt(process.env.DATABASE_MAX),
        min: parseInt(process.env.DATABASE_MIN),
        acquire: process.env.DATABASE_ACQUIRE,
        idle: process.env.DATABASE_IDLE
    }
}
    