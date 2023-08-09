import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
export  enum  DiscountType {
    Percentage=  '1',
    Fixed  =  '2',
}
export class CreateCouponDto {
    @ApiProperty()
    @IsString({message:'Name Should be text only'})
    @IsNotEmpty({message:'Name Should be required'})
    name: string;

    @ApiProperty()
    @IsString({message:'Code Should be text only'})
    @IsNotEmpty({message:'Code Should be required'})
    code: string;

    @ApiProperty()
    @IsString({message:'startDate Should be text only'})
    @IsNotEmpty({message:'startDate Should be required'})
    startDate: string;

    @ApiProperty()
    @IsString({message:'endDate Should be text only'})
    @IsNotEmpty({message:'endDate Should be required'})
    endDate: string;

    @ApiProperty()
    @IsNotEmpty({message:'Type Should be required'})
    @IsEnum(DiscountType,{message:'Type must be one of the following values:1 Percentage, 2 Fixed'})
    type: DiscountType; 

    @IsNumber({},{message:'discount Percent Should be number only'})
    @IsNotEmpty({message:'discount Persent Should be required'})
    @ApiProperty()
    discount: number;

    @IsNumber({},{message:'Amount Should be number only'})
    @IsNotEmpty({message:'Amount Should be required'})
    @ApiProperty()
    amount: number;
    
    @IsNotEmpty({message:'is_active Should be required'})
    @IsBoolean()
    @ApiProperty()
    is_active: boolean;

    @IsNotEmpty({message:'is_deleted Should be required'})
    @IsBoolean()
    @ApiProperty()
    is_deleted: boolean;
}
