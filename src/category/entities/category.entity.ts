import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, } from 'mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({timestamps:true,versionKey:false})
export class Category {
  @Prop({unique:true})
  name: string;

  @Prop({default:false})
  status?: boolean;
  
  @Prop({default:null})
  parent_category?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
};

export const CategorySchemas = SchemaFactory.createForClass(Category);