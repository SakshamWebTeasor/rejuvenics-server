import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
    IsBoolean
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import * as mongoose from 'mongoose';

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3,{message: 'Username is too short.'})
    @MaxLength(40,{message: 'Username is too long.'})  
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsObjectId({message:'parent_category should be object id or null'})
    @ApiProperty({example: '60c23d88047d3b0015c88aeb',description: 'Object ID of the user',})
    parent_category?:mongoose.Types.ObjectId ;

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        title: "Status",
        default: "false"
    })
    status: boolean;
}
