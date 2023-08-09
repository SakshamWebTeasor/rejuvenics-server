import { Module } from '@nestjs/common';
import { ProductInventoryService } from './product_inventory.service';
import { ProductInventoryController } from './product_inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductInventory, ProductInventorySchemas } from './entities/product_inventory.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Module({
  imports:[MongooseModule.forFeature([{name: ProductInventory.name , schema: ProductInventorySchemas}]),RoleGuard],
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService],
  exports : [ProductInventoryService]
})
export class ProductInventoryModule {}
