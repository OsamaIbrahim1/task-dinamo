import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { FavoriteServices,  } from "../services";
import { AuthGuard } from "src/Guards";


@Controller('favorite')

export class FavoriteController {
    constructor(private favoriteService: FavoriteServices) { }

    @Post('create')
    @UseGuards(AuthGuard)
    async createFavorite(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response = await this.favoriteService.createFavorite(req);

        res.status(201).json({ message: 'Favorite created successfully', data: response })
    }

}