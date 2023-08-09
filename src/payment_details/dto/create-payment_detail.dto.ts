import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDetailDto {
    @ApiProperty()
    @IsString({message:'Order Id Should be text only'})
    @IsNotEmpty({message:'Order Id Should be required'})
    order_id: string;

    @ApiProperty()
    @IsNumber({},{message:'Amount Should be text only'})
    @IsNotEmpty({message:'Amount Should be required'})
    amount: number;
       
    @ApiProperty()
    @IsString({message:'Provider Should be text only'})
    @IsNotEmpty({message:'Provider Should be required'})
    provider: string;

    @ApiProperty()
    @IsString({message:'Status Should be text only'})
    @IsNotEmpty({message:'Status Should be required'})
    status: string;

}
