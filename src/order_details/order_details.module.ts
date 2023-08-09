import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { RoleGuard } from 'src/auth/role.guard';
import { OrderDetail, OrderDetailSchemas } from './entities/order_detail.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: OrderDetail.name , schema: OrderDetailSchemas}]),RoleGuard],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService]
})
export class OrderDetailsModule {}
