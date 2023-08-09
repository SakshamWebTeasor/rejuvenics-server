import { Module } from '@nestjs/common';
import { UserPaymentService } from './user_payment.service';
import { UserPaymentController } from './user_payment.controller';
import { UserPayment, UserPaymentSchemas } from './entities/user_payment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports:[MongooseModule.forFeature([{name: UserPayment.name , schema: UserPaymentSchemas}]),RoleGuard],
  controllers: [UserPaymentController],
  providers: [UserPaymentService],
  exports: [UserPaymentService]
})
export class UserPaymentModule {}
