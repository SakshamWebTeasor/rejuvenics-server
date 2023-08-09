import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductInventoryService } from './product_inventory.service';
import { CreateProductInventoryDto } from './dto/create-product_inventory.dto';
import { UpdateProductInventoryDto } from './dto/update-product_inventory.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from 'src/user/filter-user.dto';

@ApiBearerAuth()
@ApiTags('Product Inventory Module')
@Controller('product-inventory')
export class ProductInventoryController {
  constructor(private readonly productInventoryService: ProductInventoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProductInventoryDto: CreateProductInventoryDto) {
    return this.productInventoryService.create(createProductInventoryDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ type: FilterDto })
  async findAll(@Query() filter: any) {
    return this.productInventoryService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.productInventoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateProductInventoryDto: UpdateProductInventoryDto) {
    return this.productInventoryService.update(id, updateProductInventoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.productInventoryService.remove(id);
  }
}
