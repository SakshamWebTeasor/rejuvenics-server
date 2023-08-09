import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShoppingSessionDto {
    @ApiProperty()
    @IsString({message:'User Id Should be text only'})
    @IsNotEmpty({message:'User Id Should be required'})
    user_id: string;

    @ApiProperty()
    @IsNumber({},{message:'Total Should be number only'})
    @IsNotEmpty({message:'Total Should be required'})
    total: number;
   
}
