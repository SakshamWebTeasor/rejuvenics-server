import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchemas } from './entities/order_item.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports:[MongooseModule.forFeature([{name: OrderItem.name , schema: OrderItemSchemas}]),RoleGuard],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService]
})
export class OrderItemsModule {}
