import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsBoolean
} from 'class-validator';

export class UserRegisterDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4, { message: 'Username is too short.' })
    @MaxLength(20, { message: 'Username is too long.' })  
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    image: string;

    @IsNotEmpty()
    @MinLength(4, { message: 'Username is too short.' })
    @MaxLength(20, { message: 'Username is too long.' }) 
    @ApiProperty()
    password: string;
}
