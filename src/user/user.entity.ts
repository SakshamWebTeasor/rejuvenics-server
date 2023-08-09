import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';
import { Transform, Exclude } from 'class-transformer';

export type UserDocument =User & Document;

@Schema({timestamps:true,versionKey:false})
export class User {
  @Prop()
  name: string;

  @Prop({unique:true,})
  email: string;

  @Prop({unique:true})
  phone: string;

  @Prop({default:false})
  isAdmin?: boolean;

  @Prop()
  password: string;
};

export const UserSchemas = SchemaFactory.createForClass(User);