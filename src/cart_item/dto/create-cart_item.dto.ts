import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartItemDto {
    @ApiProperty()
    @IsString({message:'Session Id Should be text only'})
    @IsNotEmpty({message:'Session Id Should be required'})
    session_id: string;

    @ApiProperty()
    @IsString({message:'Product Id Should be text only'})
    @IsNotEmpty({message:'Product Id Should be required'})
    product_id: string;

    @ApiProperty()
    @IsNumber({},{message:'Quantity Should be number only'})
    @IsNotEmpty({message:'Quantity Should be required'})
    quantity: number;

}
