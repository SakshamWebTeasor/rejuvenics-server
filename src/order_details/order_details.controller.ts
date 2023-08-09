import { Controller, Get, Post, Body, Patch, Param, Delete,Query, UseGuards } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterDto } from 'src/order_details/dto/filter-order_detail.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Order Details Module')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  //@UseGuards(AuthGuard('jwt'))
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
 // @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ type: FilterDto})
  async findAll(@Query() filter: any) {
    return this.orderDetailsService.findAll(filter);
  }

  @Get(':id')
  //@UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(id);
  }

  // @Get('user/:id')
  // //@UseGuards(AuthGuard('jwt'))
  // findByUserId(@Param('id') id: string) {
  //   return this.orderDetailsService.findByUserId(id);
  // }
  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ type: FilterDto})
  findByUserId(@Param('userId') id: string, @Query() filter: any) {
    return this.orderDetailsService.findByUserId(id,filter);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(id);
  }
}
