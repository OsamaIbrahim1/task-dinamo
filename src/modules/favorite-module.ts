import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { models } from "src/DB/model-generation";
import { FavoriteController } from "src/favorite/controller";
import { FavoriteServices } from "src/favorite/services";

@Module({
    imports: [models],
    providers: [FavoriteServices,JwtService],
    controllers: [FavoriteController],
})
export class FavoriteModule { }
