import * as dotenv from "dotenv";
const  { DB_HOST, DB_PORT, DB_USERNAME, DB_NAME, DB_PASSWORD, DB_TYPE} = process.env
module.exports= {
        "type": DB_TYPE,
        "host": DB_HOST,
        "port": DB_PORT,
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "entities": ["app/entities/**/*.ts"],
        "migrations": ["app/migrations/**/*.ts"],
        "cli": {
          "entitiesDir": "app/entities",
          "migrationsDir": "app/migrations"
        }
}