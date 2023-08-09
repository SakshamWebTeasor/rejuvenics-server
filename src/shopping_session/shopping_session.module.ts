import { Module } from '@nestjs/common';
import { ShoppingSessionService } from './shopping_session.service';
import { ShoppingSessionController } from './shopping_session.controller';
import { RoleGuard } from 'src/auth/role.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingSchemas, ShoppingSession } from './entities/shopping_session.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: ShoppingSession.name , schema: ShoppingSchemas}]),RoleGuard],

  controllers: [ShoppingSessionController],
  providers: [ShoppingSessionService],
  exports: [ShoppingSessionService]

})
export class ShoppingSessionModule {}
