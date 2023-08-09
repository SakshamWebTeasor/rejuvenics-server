import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDiscountDto {
    @ApiProperty()
    @IsString({message:'Title Should be text only'})
    @IsNotEmpty({message:'Title Should be required'})
    name: string;

    @ApiProperty()
    @IsString({message:'Description Should be text only'})
    @IsNotEmpty({message:'Description Should be required'})
    description: string;

    @IsNumber({},{message:'Discount Percent Should be number only'})
    @IsNotEmpty({message:'discount Persent Should be required'})
    @ApiProperty()
    discount_percent: number;

    @IsNotEmpty({message:'is_active Should be required'})
    @IsBoolean()
    @ApiProperty()
    is_active: boolean;

    @IsNotEmpty({message:'is_deleted Should be required'})
    @IsBoolean()
    @ApiProperty()
    is_deleted: boolean;
}
