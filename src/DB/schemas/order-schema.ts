import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema({ timestamps: true })

export class Order {

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    consumerId: mongoose.Schema.Types.ObjectId

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    vendorId: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    riderId: mongoose.Schema.Types.ObjectId

    @Prop({
        type: String,
        required: true,
        enum: ['pending', 'in-progress', 'delivered', 'cancelled']
    })
    status: string;

    @Prop({
        type: [{
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
            price: Number
        }],
        required: true
    })
    products: [{

        productId: mongoose.Schema.Types.ObjectId,
        quantity: number,
        price: number
    }]
}

export const OrderSchema = SchemaFactory.createForClass(Order) 