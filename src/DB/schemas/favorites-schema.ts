import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema({ timestamps: true })
export class Favorite {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    })
    favoriteId: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: String,
        enum: ["Restaurant", "Product"],
    })
    onModel: string;
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorite) 