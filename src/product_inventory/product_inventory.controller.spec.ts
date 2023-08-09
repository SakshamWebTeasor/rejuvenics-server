import { Test, TestingModule } from '@nestjs/testing';
import { ProductInventoryController } from './product_inventory.controller';
import { ProductInventoryService } from './product_inventory.service';

describe('ProductInventoryController', () => {
  let controller: ProductInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInventoryController],
      providers: [ProductInventoryService],
    }).compile();

    controller = module.get<ProductInventoryController>(ProductInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
