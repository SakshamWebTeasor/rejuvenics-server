import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

export class CreateProductDto {
    @ApiProperty()
    @IsString({message:'Title Should be text only'})
    @IsNotEmpty({message:'Title Should be required'})
    title: string;

    @ApiProperty()
    @IsString({message:'Description Should be text only'})
    @IsNotEmpty({message:'Description Should be required'})
    description: string;
    
    @IsString({message:'SKU Should be text only'})
    @IsNotEmpty({message:'SKU Should be required'})
    @ApiProperty()
    sku: string;

    @IsNumber({},{message:'Price Should be number only'})
    @IsNotEmpty({message:'Price Should be required'})
    @ApiProperty()
    price: number;

    @IsString({message:'Specification Should be text only'})
    @IsNotEmpty({message:'Specification Should be required'})
    @ApiProperty()
    specification:string;

    @IsNumber({},{message:'Discount Should be number only'})
    @IsNotEmpty({message:'Discount Should be required'})
    @ApiProperty()
    discount: number;

    @IsNotEmpty({message:'Createdby Should be required'})
    @IsObjectId({message:'createdby should be object id'})
    @ApiProperty()
    createdby: string;

    @IsNotEmpty({message:'is_in_stock Should be required'})
    @IsBoolean()
    @ApiProperty()
    is_in_stock: boolean;
}
