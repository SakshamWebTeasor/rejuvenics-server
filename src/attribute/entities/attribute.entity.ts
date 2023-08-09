import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type AttributeDocument = Attribute & Document;
export  enum  AttributeType {
    Dropdown=  '1',
    Radio  =  '2',
}
@Schema({timestamps:true,versionKey:false})
export class Attribute {
    @Prop({unique:true})
    title: string;
 
    @Prop({default:null})
    name: string;

    @Prop({ enum: AttributeType , default:AttributeType.Dropdown})
    type: AttributeType;

    @Prop({default:null})
    variants:string;
}
export const AttributeSchemas = SchemaFactory.createForClass(Attribute);