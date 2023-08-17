import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ProductDocument = Product & Document;

@Schema({timestamps:true,versionKey:false})
export class Product {
    @Prop({unique:true})
    title: string;

    @Prop({default:null})
    description: string;

    @Prop({default:null})
    sku:string;

    @Prop({default:null})
    p_image_link:string;

    @Prop({default:null})
    p_image:string;

    @Prop({default:null})
    price:number;

    @Prop({default:null})
    specification:string;

    @Prop({default:null})
    discount:number;

    @Prop({default:false})
    is_in_stock:boolean;

    @Prop({default:false})
    is_active:boolean;

    @Prop({default:null})
    createdby : mongoose.Types.ObjectId;
}
export const ProductSchemas = SchemaFactory.createForClass(Product);