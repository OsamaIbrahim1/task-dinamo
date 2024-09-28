import { MongooseModule } from "@nestjs/mongoose";
import { Favorite, FavoritesSchema, Restaurant, RestaurantSchema, User, UserSchema } from "./Schemas";



export const models = MongooseModule.forFeature(
    [{
        name: User.name, schema: UserSchema
    },
    {
        name: Favorite.name, schema: FavoritesSchema
    }, {
        name: Restaurant.name, schema: RestaurantSchema
    }]
)