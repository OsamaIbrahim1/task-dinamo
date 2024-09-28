import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })

export class Application {

    @Prop({
        type: String,
        required: true,
    })
    name: string

    @Prop({
        type: String,
        required: true,
        default: 'consumer',
        enum: ['consumer', 'rider', 'vendor'],
    })
    type: string

    @Prop({
        type: String,
        required: true
    })
    description: string
}

export const ApplicationSchema = SchemaFactory.createForClass(Application) 