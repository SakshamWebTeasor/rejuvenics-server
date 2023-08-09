import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ShoppingSessionService } from './shopping_session.service';
import { CreateShoppingSessionDto } from './dto/create-shopping_session.dto';
import { UpdateShoppingSessionDto } from './dto/update-shopping_session.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterDto } from 'src/user/filter-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Shopping session Module')

@Controller('shopping-session')
export class ShoppingSessionController {
  constructor(private readonly shoppingSessionService: ShoppingSessionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createShoppingSessionDto: CreateShoppingSessionDto) {
    return this.shoppingSessionService.create(createShoppingSessionDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ type: FilterDto})
  async findAll(@Query() filter: any) {
    return this.shoppingSessionService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.shoppingSessionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateShoppingSessionDto: UpdateShoppingSessionDto) {
    return this.shoppingSessionService.update(id, updateShoppingSessionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.shoppingSessionService.remove(id);
  }
}
