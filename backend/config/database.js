import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const dialect = process.env.DB_DIALECT

const db = new Sequelize(database,username,password,{
    host : host,
    port : port,
    dialect : dialect
})

export default db