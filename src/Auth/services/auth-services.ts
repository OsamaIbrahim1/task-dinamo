import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import * as env from '../../config'
import { Model } from "mongoose";
import { User } from "src/DB/Schemas";

@Injectable()

export class AuthService {
    constructor(
        @InjectModel(User.name) private User: Model<User>,
        private jwtService: JwtService,
    ) { }

    //================================= sign up Admin =================================//
    async signUpServices(req: any) {
        try {
            // * destructuring data from body
            const { name, email, password, phoneNumber, birthDate, role } = req.body

            // * check email is already exist or not
            const isEmailExist = await this.User.findOne({ email });
            if (isEmailExist) {
                throw new BadRequestException({ message: 'Email is already exist', status: 400 });
            }

            //  * check if phone number is already exist or not
            const isPhoneNumberExist = await this.User.findOne({ phoneNumber });
            if (isPhoneNumberExist) {
                throw new BadRequestException({ message: 'Phone number is already exist', status: 400 });
            }

            // * hash password
            const hashedPassword = bcrypt.hashSync(password, env.SALT_ROUNDS);
            if (!hashedPassword) {
                throw new BadRequestException({ message: 'Password not hashed', status: 400 });
            }

            // * generate token
            const token = await this.jwtService.signAsync({ email, name, role }, { secret: env.SECRET_LOGIN_TOKEN, expiresIn: env.TIME_EXPIRE_TOKEN })
            if (!token) {
                throw new BadRequestException({ message: 'Token not generated', status: 400 });
            }

            // * generate object for create admin
            const userObj = {
                name,
                email,
                phoneNumber,
                password: hashedPassword,
                birthDate,
                role,
                token
            }

            // * create admin
            const user = await this.User.create(userObj);
            if (!user) {
                throw new BadRequestException({ message: 'User not created', status: 400 });
            }

            return { token }
        } catch (err) {
            if (!err['response']) {
                throw new InternalServerErrorException({
                    message: 'An unexpected error occurred.',
                    status: 500,
                    timestamp: new Date().toISOString(),
                    error: err.message || 'Unknown error'
                });
            }
            throw new HttpException({
                error: err['response'].message,
                status: err['response'].status,
                timestamp: new Date().toISOString()
            }, err['response'].status, {
                cause: err
            });
        }
    }

    //================================= login Admin =================================//
    async loginServices(req: any) {
        try {
            // * destructuring data from body
            const { email, phoneNumber, password } = req.body

            // * find user by email or mobile number
            const user = await this.User.findOne({ $or: [{ email }, { phoneNumber }] });
            if (!user) {
                throw new BadRequestException({ message: "User not found", status: 404 })
            }

            const isPasswordMatched = bcrypt.compareSync(password, user.password);
            if (!isPasswordMatched) {
                throw new BadRequestException({ message: "Password not matched", status: 400 })
            }

            const token = await this.jwtService.signAsync({ email: user.email, name: user.name, role: user.role }, { secret: env.SECRET_LOGIN_TOKEN, expiresIn: env.TIME_EXPIRE_TOKEN })
            if (!token) {
                throw new BadRequestException({ message: 'Token not generated', status: 400 })
            }

            return { token }
        } catch (err) {
            if (!err['response']) {
                throw new InternalServerErrorException({
                    message: 'An unexpected error occurred.',
                    status: 500,
                    timestamp: new Date().toISOString(),
                    error: err.message || 'Unknown error'
                });
            }
            throw new HttpException({
                error: err['response'].message,
                status: err['response'].status,
                timestamp: new Date().toISOString()
            }, err['response'].status, {
                cause: err
            });
        }
    }
}