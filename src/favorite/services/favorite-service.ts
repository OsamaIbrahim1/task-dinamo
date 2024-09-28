import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Favorite, Restaurant } from "src/DB/Schemas";


@Injectable()
export class FavoriteServices {
    constructor(
        @InjectModel(Restaurant.name) private Restaurant: Model<Restaurant>,
        @InjectModel(Favorite.name) private Favorite: Model<Favorite>,

    ) {

    }

    async createFavorite(req: any) {
        try {
            // * destructuring the request query
            const { favoriteId, onModel } = req.query
            // * destructuring the request user
            const { _id } = req.user

            // * creating the favorite
            if (onModel === 'Restaurant') {
                const checkModelId = await this.Restaurant.findById(favoriteId);
                if (!checkModelId) {
                    throw new NotFoundException({ message: 'Restaurant Not found', status: 400 });
                }
            }

            // * check if the model in favorite delete it
            const checkModel = await this.Favorite.findOne({ favoriteId, _id });
            if (checkModel) {
                await this.Favorite.findByIdAndDelete(checkModel._id);
            }

            // * create object favorite
            const favoriteObj = {
                userId: _id,
                favoriteId,
                onModel,
            };

            // * create new document
            const addModelToFavorite = await this.Favorite.create(favoriteObj);
            if (!addModelToFavorite) {
                throw new BadRequestException({ message: 'Not added to Favorites', status: 400 });
            }

            return addModelToFavorite;
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