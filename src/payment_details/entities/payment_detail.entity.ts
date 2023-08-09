import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type PaymentDetailDocument = PaymentDetail & Document;

@Schema({timestamps:true,versionKey:false})
export class PaymentDetail {
    @Prop({unique:true})
    order_id: mongoose.Types.ObjectId;

    @Prop({default:null})
    amount: number;

    @Prop({default:null})
    provider: string;

    @Prop({default:null})
    status: string;

}
export const PaymentDetailSchemas = SchemaFactory.createForClass(PaymentDetail);