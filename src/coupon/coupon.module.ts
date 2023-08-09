import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchemas } from './entities/coupon.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports:[MongooseModule.forFeature([{name: Coupon.name , schema: CouponSchemas}]),RoleGuard],
  controllers: [CouponController],
  providers: [CouponService],
  exports : [CouponService]
})
export class CouponModule {}
