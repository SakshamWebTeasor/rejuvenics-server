import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { RoleGuard } from 'src/auth/role.guard';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchemas } from "./entities/category.entity";

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchemas }]),RoleGuard],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports : [CategoryService]
})
export class CategoryModule {}
