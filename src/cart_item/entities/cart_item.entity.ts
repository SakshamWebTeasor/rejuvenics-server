import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CartItemDocument = CartItem & Document;

@Schema({timestamps:true,versionKey:false})
export class CartItem {
    @Prop()
    session_id: mongoose.Types.ObjectId;

    @Prop()
    product_id: mongoose.Types.ObjectId;

    @Prop({default:null})
    quantity: number;
}
export const CartItemSchemas = SchemaFactory.createForClass(CartItem);