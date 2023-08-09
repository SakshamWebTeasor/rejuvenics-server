import { PartialType } from '@nestjs/swagger';
import { CreateProductInventoryDto } from './create-product_inventory.dto';

export class UpdateProductInventoryDto extends PartialType(CreateProductInventoryDto) {}
