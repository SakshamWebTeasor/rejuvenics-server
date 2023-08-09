import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards ,UseInterceptors , UploadedFile  } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterDto } from './dto/filter-product.dto';
import { Multer, diskStorage } from 'multer';
import { UploadDto } from './dto/file-upload.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
@ApiBearerAuth()
@ApiTags('Product Module')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ type: FilterDto })
  async findAll(@Query() filter: any) {
    return this.productService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  } 

  @Post('uploads')
    //@UseGuards(AuthGuard('jwt'))
   // @ApiQuery({ type: UploadDto })
   @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() UploadDto : UploadDto) {
    const fileBuffer = file.buffer;
    const filename = file.originalname;
    const fileUrl = await this.productService.uploadFile(fileBuffer, filename);
    console.log('File URL:', fileUrl);
  }


  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         return cb(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  //   }),
  // )
  // async uploadFile(@UploadedFile() file, @Body() UploadDto : UploadDto) {
  //   const filePath = await this.productService.uploadFile(file);
  //   return { filePath };
  // }

}