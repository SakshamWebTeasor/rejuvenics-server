import { Module } from '@nestjs/common';
import { PaymentDetailsService } from './payment_details.service';
import { PaymentDetailsController } from './payment_details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentDetail, PaymentDetailSchemas } from './entities/payment_detail.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports:[MongooseModule.forFeature([{name: PaymentDetail.name , schema: PaymentDetailSchemas}]),RoleGuard],
  controllers: [PaymentDetailsController],
  providers: [PaymentDetailsService],
  exports: [PaymentDetailsService]

})
export class PaymentDetailsModule {}
