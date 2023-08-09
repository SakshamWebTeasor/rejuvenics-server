import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
   @ApiProperty({
    type: 'string',
    title: "Upload Image",
    format: "binary",
    description: 'This is a required property',
})
readonly file: any;
}