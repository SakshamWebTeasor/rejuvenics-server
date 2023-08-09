import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type UserAddressDocument = UserAddress & Document;

@Schema({timestamps:true,versionKey:false})
export class UserAddress {
    @Prop({unique:true})
    user_id: mongoose.Types.ObjectId;

    @Prop({default:null})
    address_line1: string;

    @Prop({default:null})
    address_line2: string;

    @Prop({default:null})
    city: string;

    @Prop({unique:true})
    postal_code: string;

    @Prop({default:null})
    country: string;

    @Prop({unique:true})
    telephone: number;

    @Prop({unique:true})
    mobile: number;
}
export const UserAddressSchemas = SchemaFactory.createForClass(UserAddress);