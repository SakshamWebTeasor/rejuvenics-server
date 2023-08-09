import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
export  enum  StatusType {
    Processing=  '1',
    Intransit  =  '2',
    Delivered=  '3',
    Cancelled  =  '4',
}
export class CreateOrderDetailDto {
    @ApiProperty()
    @IsString({message:'User Id Should be text only'})
    @IsNotEmpty({message:'User Id Should be required'})
    user_id: string;

    @ApiProperty()
    @IsString({message:'Payment Id Should be text only'})
    @IsNotEmpty({message:'Payment Id Should be required'})
    payment_id: string;

    @ApiProperty()
    @IsNumber({},{message:'Total Should be number only'})
    @IsNotEmpty({message:'Total Should be required'})
    total: number;

    @ApiProperty()
    @IsNotEmpty({message:'Status Should be required'})
    @IsEnum(StatusType,{message:'Status must be one of the following values:1 Processing, 2 Intransit, 3 Delivered, 4 Cancelled'})
    status: StatusType; 
}
