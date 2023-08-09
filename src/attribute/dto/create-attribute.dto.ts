import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty, IsString } from "class-validator";

export  enum  AttributeType {
    Dropdown=  '1',
    Radio  =  '2',
}
export class CreateAttributeDto {
    @ApiProperty()
    @IsString({message:'Title Should be text only'})
    @IsNotEmpty({message:'Title Should be required'})
    title: string;

    @ApiProperty()
    @IsString({message:'Name Should be text only'})
    @IsNotEmpty({message:'Name Should be required'})
    name: string;

    @ApiProperty()
    @IsNotEmpty({message:'Type Should be required'})
    @IsEnum(AttributeType,{message:'Type must be one of the following values:1 Dropdown, 2 Radio'})
    type: AttributeType; 

    @IsNotEmpty({message:'Variant Should be required'})
    @ApiProperty()
    variants: string;
}
