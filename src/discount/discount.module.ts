import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Discount, DiscountSchemas } from './entities/discount.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports:[MongooseModule.forFeature([{name: Discount.name , schema: DiscountSchemas}]),RoleGuard],
  controllers: [DiscountController],
  providers: [DiscountService],
  exports : [DiscountService]
})
export class DiscountModule {}
