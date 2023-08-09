import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { FilterDto } from './dto/filter-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadDto } from 'src/product/dto/file-upload.dto';

@ApiBearerAuth()
@ApiTags('Category Module')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiOperation({ summary: 'Create Category and Subcategory', description: 'Create parent category by pass "parent_category" null <br> Create sub category with enter category id' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiQuery({ type: FilterDto })
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() filter: any) {
    return this.categoryService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Post('uploads')
  @UseGuards(AuthGuard('jwt'))
 @ApiConsumes('multipart/form-data')
 @UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }),
)
async uploadFile(@UploadedFile() file, @Body() UploadDto : UploadDto) {
  const filePath = await this.categoryService.uploadFile(file);
  return { filePath };
}
}
