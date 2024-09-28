import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthController } from "src/Auth/controller";
import { AuthService } from "src/Auth/services";
import { models } from "src/DB/model-generation";

@Module({
    imports: [models],
    providers: [AuthService, JwtService],
    controllers: [AuthController],
})
export class AuthModule { }
