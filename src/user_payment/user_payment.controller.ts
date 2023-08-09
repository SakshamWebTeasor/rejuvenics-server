import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserPaymentService } from './user_payment.service';
import { CreateUserPaymentDto } from './dto/create-user_payment.dto';
import { UpdateUserPaymentDto } from './dto/update-user_payment.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterDto } from 'src/user/filter-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('User Payment Module')

@Controller('user-payment')
export class UserPaymentController {
  constructor(private readonly userPaymentService: UserPaymentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserPaymentDto: CreateUserPaymentDto) {
    return this.userPaymentService.create(createUserPaymentDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ type: FilterDto})
  async findAll(@Query() filter: any) {
    return this.userPaymentService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userPaymentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserPaymentDto: UpdateUserPaymentDto) {
    return this.userPaymentService.update(id, updateUserPaymentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.userPaymentService.remove(id);
  }
}
