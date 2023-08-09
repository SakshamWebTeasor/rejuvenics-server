import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ShoppingDocument = ShoppingSession & Document;

@Schema({timestamps:true,versionKey:false})
export class ShoppingSession {
    @Prop()
    user_id: mongoose.Types.ObjectId;

    @Prop({default:null})
    total: number;

}
export const ShoppingSchemas = SchemaFactory.createForClass(ShoppingSession);