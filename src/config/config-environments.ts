import * as dotenv from 'dotenv'

dotenv.config()

export const PORT = +process.env.PORT

export const DB_CONNECTION = process.env.DB_CONNECTION

export const SALT_ROUNDS = +process.env.SALT_ROUNDS

export const SECRET_LOGIN_TOKEN = process.env.SECRET_LOGIN_TOKEN

export const TIME_EXPIRE_TOKEN = process.env.TIME_EXPIRE_TOKEN

export const PREFIX_LOGIN_TOKEN = process.env.PREFIX_LOGIN_TOKEN