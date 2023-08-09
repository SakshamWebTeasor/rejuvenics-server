import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsEmail,
} from 'class-validator';

export class AuthLoginDto {
    @IsEmail()
    @ApiProperty({
        type: String,
        title: "Email",
        default: "neeru.webteasor@gmail.com",
        description: 'This is a required property',
    })    email: string;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        title: "password",
        default: "neeru@12345",
        description: 'This is a required property',
    })
    password: string;
}
