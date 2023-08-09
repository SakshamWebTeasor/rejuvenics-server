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
    @IsString()
    @ApiPropertyOptional()
    startDate?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    endDate?: string;
   
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    status?: number;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    page?: number;
  
    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional()
    pageSize?: number;

  }