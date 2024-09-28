import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/utils";



@Schema({ timestamps: true })
export class User {
    @Prop({
        type: String,
        trim: true,
        min: 10,
        max: 50,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        trim: true,
        unique: true,
        required: true,
    })
    email: string;

    @Prop({
        type: String,
        trim: true,
        required: true,
    })
    phoneNumber: string


    @Prop({
        type: String,
        trim: true,
        min: 6,
        max: 15,
        required: true,
    })
    password: string;

    @Prop({
        type: Date,
        max: new Date('2006-12-30'),
        min: new Date('1940-01-01'),
        trim: true
    })
    birthDate: Date;

    @Prop({
        required: true,
        type: String,
        default: Role.RIDERS,
        enum: [Role.ADMIN, Role.TECHNICAL_SUPPORT, Role.SALES, Role.VENDORS, Role.RIDERS]
    })
    role: string

    @Prop({
        type: String,
        trim: true,
    })
    token: string
}

export const UserSchema = SchemaFactory.createForClass(User) 