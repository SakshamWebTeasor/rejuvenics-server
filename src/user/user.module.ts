import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { RoleGuard } from 'src/auth/role.guard';
import { UserController } from './user.controller';
import { User, UserSchemas } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchemas }]),RoleGuard],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService]
})
export class UserModule {}
