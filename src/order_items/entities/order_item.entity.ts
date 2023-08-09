import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type OrderItemDocument = OrderItem & Document;

@Schema({timestamps:true,versionKey:false})
export class OrderItem {
    @Prop({unique:true})
    order_id: mongoose.Types.ObjectId;

    @Prop({unique:true})
    product_id: mongoose.Types.ObjectId;

    @Prop({default:null})
    quantity: number;
}
export const OrderItemSchemas = SchemaFactory.createForClass(OrderItem);