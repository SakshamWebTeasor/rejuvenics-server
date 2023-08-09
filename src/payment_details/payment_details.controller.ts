import { Controller, Get, Post, Body, Patch, Param, Delete , Query, UseGuards} from '@nestjs/common';
import { PaymentDetailsService } from './payment_details.service';
import { CreatePaymentDetailDto } from './dto/create-payment_detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment_detail.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterDto } from 'src/user/filter-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Payment Details Module')

@Controller('payment-details')
export class PaymentDetailsController {
  constructor(private readonly paymentDetailsService: PaymentDetailsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPaymentDetailDto: CreatePaymentDetailDto) {
    return this.paymentDetailsService.create(createPaymentDetailDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({ type: FilterDto})
  async findAll(@Query() filter: any) {
    return this.paymentDetailsService.findAll(filter);
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.paymentDetailsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updatePaymentDetailDto: UpdatePaymentDetailDto) {
    return this.paymentDetailsService.update(id, updatePaymentDetailDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.paymentDetailsService.remove(id);
  }
}
