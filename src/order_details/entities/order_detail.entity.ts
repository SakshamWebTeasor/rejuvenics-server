import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type OrderDetailDocument = OrderDetail & Document;
export  enum  StatusType {
    Processing=  '1',
    Intransit  =  '2',
    Delivered=  '3',
    Cancelled  =  '4',
}
@Schema({timestamps:true,versionKey:false})
export class OrderDetail {
    @Prop()
    user_id: string;

    @Prop({default:null})
    payment_id: string;

    @Prop({default:null})
    total: number;
   
    @Prop({ enum: StatusType , default:StatusType.Processing})
    status:StatusType;
}
export const OrderDetailSchemas = SchemaFactory.createForClass(OrderDetail);