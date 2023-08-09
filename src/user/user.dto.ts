import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsBoolean
} from 'class-validator';

export class UserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4, { message: 'Username is too short.' })
    @MaxLength(20, { message: 'Username is too long.' })  
    @ApiProperty()
    name?: string;

    @IsEmail({},{ message: 'Email address is not valid' })
    @ApiProperty()
    email?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phone?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    image: string; 
    
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    isAdmin?: boolean;

    @IsNotEmpty()
    @MinLength(4, { message: 'Username is too short.' })
    @MaxLength(20, { message: 'Username is too long.' }) 
    @ApiProperty()
    password?: string;
}
