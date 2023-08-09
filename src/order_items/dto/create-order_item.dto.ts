import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderItemDto {
    @ApiProperty()
    @IsString({message:'Order Id Should be text only'})
    @IsNotEmpty({message:'Order Id Should be required'})
    order_id: string;

    @ApiProperty()
    @IsString({message:'Product Id Should be text only'})
    @IsNotEmpty({message:'Product Id Should be required'})
    product_id: string;

    @ApiProperty()
    @IsNumber({},{message:'Quantity Should be text only'})
    @IsNotEmpty({message:'Quantity Should be required'})
    quantity: number; 
}
