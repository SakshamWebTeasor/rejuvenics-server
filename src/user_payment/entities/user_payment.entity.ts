import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type UserPaymentDocument = UserPayment & Document;

@Schema({timestamps:true,versionKey:false})
export class UserPayment {
    @Prop({unique:true})
    user_id: mongoose.Types.ObjectId;

    @Prop({default:null})
    payment_type: string;

    @Prop({default:null})
    provider: string;

    @Prop({default:null})
    account_no: string;

    @Prop({default:null})
    expiry: string;
}
export const UserPaymentSchemas = SchemaFactory.createForClass(UserPayment);