import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attribute, AttributeSchemas } from './entities/attribute.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports:[MongooseModule.forFeature([{name: Attribute.name , schema: AttributeSchemas}]),RoleGuard],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports : [AttributeService]
})
export class AttributeModule {}
