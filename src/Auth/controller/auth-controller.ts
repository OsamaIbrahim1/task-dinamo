import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "../services";
import { Request, Response } from "express";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('register')
    async register(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const response = await this.authService.signUpServices(req);

        res.status(201).json({ message: 'User created successfully', data: response })
    }

    @Post('login')
    async login(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response = await this.authService.loginServices(req);

        res.status(201).json({ message: 'User created successfully', data: response })
    }
}