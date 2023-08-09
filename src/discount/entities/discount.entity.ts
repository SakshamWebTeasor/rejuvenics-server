import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type DiscountDocument = Discount & Document;

@Schema({timestamps:true,versionKey:false})

export class Discount {
    @Prop({unique:true})
    name: string;

    @Prop({default:null})
    description: string;

    @Prop({default:0})
    discount_percent:number;

    @Prop({default:false})
    is_active:boolean;

    @Prop({default:true})
    is_deleted:boolean;
}
export const DiscountSchemas = SchemaFactory.createForClass(Discount);