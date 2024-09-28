import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })

export class Restaurant {

    @Prop({
        type: String,
        required: true,
    })
    name: string

    @Prop({
        type: {
            secure_url: { type: String, required: true },
            public_id: { type: String, required: true, unique: true }
        }
    })
    logo: { secure_url: string, public_id: string };

    @Prop({
        type: String,
        unique: true
    })
    folderId: string

    @Prop({
        type: String,
        required: true
    })
    address: string
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant) 