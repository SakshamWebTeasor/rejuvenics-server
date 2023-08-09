import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductInventoryDto {
    @IsNumber({},{message:'Quantity Should be number only'})
    @IsNotEmpty({message:'Quanity Should be required'})
    @ApiProperty()
    quantity: number;

    @IsNotEmpty({message:'is_deleted Should be required'})
    @IsBoolean()
    @ApiProperty()
    is_deleted: boolean;
}
