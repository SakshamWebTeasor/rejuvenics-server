import { Module } from '@nestjs/common';
import { UserAddressService } from './user_address.service';
import { UserAddressController } from './user_address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleGuard } from 'src/auth/role.guard';
import { UserAddress, UserAddressSchemas } from './entities/user_address.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: UserAddress.name , schema: UserAddressSchemas}]),RoleGuard],
  controllers: [UserAddressController],
  providers: [UserAddressService],
  exports: [UserAddressService]

})
export class UserAddressModule {}
