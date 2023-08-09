import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductInventoryDocument = ProductInventory & Document;

@Schema({timestamps:true,versionKey:false})
export class ProductInventory {
    @Prop({default:null})
    quantity:number;

    @Prop({default:false})
    is_deleted:boolean;

}
export const ProductInventorySchemas = SchemaFactory.createForClass(ProductInventory);