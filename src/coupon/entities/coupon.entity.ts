import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type CouponDocument = Coupon & Document;
export  enum  DiscountType {
    Percentage=  '1',
    Fixed  =  '2',
}
@Schema({timestamps:true,versionKey:false})
export class Coupon {
    @Prop({unique:true})
    name: string;

    @Prop({default:null})
    code: string;

    @Prop({default:0})
    startDate:string;

    @Prop({default:0})
    endDate:string;
    
    @Prop({ enum: DiscountType , default:DiscountType.Fixed})
    type:DiscountType; 

    @Prop({default:0})
    discount:number;

    @Prop({default:0})
    amount:number;

    @Prop({default:false})
    is_active:boolean;

    @Prop({default:true})
    is_deleted:boolean;
}
export const CouponSchemas = SchemaFactory.createForClass(Coupon);
