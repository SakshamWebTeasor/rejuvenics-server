import { Module } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartItem, CartItemSchemas } from './entities/cart_item.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports:[MongooseModule.forFeature([{name: CartItem.name , schema: CartItemSchemas}]),RoleGuard],

  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService]

})
export class CartItemModule {}
