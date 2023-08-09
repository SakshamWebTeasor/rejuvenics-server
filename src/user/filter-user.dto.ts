import {
    IsOptional,
    IsNumber,
    IsString,
} from 'class-validator';
import {  ApiPropertyOptional } from '@nestjs/swagger';

export class FilterDto {

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    search?: string;
   
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    page?: number;
  
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    pageSize?: number;

  }