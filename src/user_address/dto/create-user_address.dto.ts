import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserAddressDto {
    @ApiProperty()
    @IsString({message:'User Id Should be text only'})
    @IsNotEmpty({message:'User Id Should be required'})
    user_id: string;

    @ApiProperty()
    @IsString({message:'Address Should be text only'})
    @IsNotEmpty({message:'Address Should be required'})
    address_line1: string;
       
    @ApiProperty()
    @IsString({message:'Address Should be text only'})
    @IsNotEmpty({message:'Address Should be required'})
    address_line2: string;

    @ApiProperty()
    @IsString({message:'City Should be text only'})
    @IsNotEmpty({message:'City Should be required'})
    city: string;

    @ApiProperty()
    @IsNotEmpty({message:'Postal Code Should be required'})
    postal_code: string;

    @ApiProperty()
    @IsString({message:'Country Should be text only'})
    @IsNotEmpty({message:'Country Should be required'})
    country: string;

    @ApiProperty()
    @IsNumber({},{message:'Telephone Should be number only'})
    @IsNotEmpty({message:'Telephone Should be required'})
    @IsPhoneNumber()  
    telephone: number;

    @ApiProperty()
    @IsNumber({},{message:'Mobile Should be number only'})
    @IsNotEmpty({message:'Mobile Should be required'})
    @IsPhoneNumber()  
    mobile:number;

}
