import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateUserPaymentDto {
    @ApiProperty()
    @IsString({message:'User Id Should be text only'})
    @IsNotEmpty({message:'User Id Should be required'})
    user_id: string;

    @ApiProperty()
    @IsString({message:'Address Should be text only'})
    @IsNotEmpty({message:'Address Should be required'})
    payment_type: string;
       
    @ApiProperty()
    @IsString({message:'Address Should be text only'})
    @IsNotEmpty({message:'Address Should be required'})
    provider: string;

    @ApiProperty()
    @IsString({message:'Account no. Should be text only'})
    @IsNotEmpty({message:'Account no. Should be required'})
    account_no: string;

    @ApiProperty()
    @IsNotEmpty({message:'expiry date Should be required'})
    expiry: string;
}
