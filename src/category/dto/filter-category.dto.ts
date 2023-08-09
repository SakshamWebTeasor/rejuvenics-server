import {
    IsOptional,
    IsNumber,
    Min,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import {  ApiPropertyOptional } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class FilterDto {
    @IsOptional()
    @IsObjectId({message:'parent_category should be object id or null'})
    @ApiPropertyOptional()
    parent_category?:string;
    
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    page?: number;
  
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    pageSize?: number;

  }