import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { CreateProductInventoryDto } from './dto/create-product_inventory.dto';
import { UpdateProductInventoryDto } from './dto/update-product_inventory.dto';
import { Model } from 'mongoose';
import { ProductInventory, ProductInventoryDocument } from './entities/product_inventory.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class ProductInventoryService {
  constructor(@InjectModel(ProductInventory.name) private productInventoryModel: Model<ProductInventoryDocument>) {
  }
  async create(createProductInventoryDto: CreateProductInventoryDto) {
    try {
      let savedData = await this.productInventoryModel.create(createProductInventoryDto)
      return {
        message: "Product Inventory created Successfully",
        success: true,
        data: savedData
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException({
          status: 400,
          error: "Already Exist"
        });
      } else {
        throw new BadRequestException({
          status: 400,
          error: error.message
        });
      }
    }
  }

  async findAll(data: FilterDto): Promise<any | null> {
    try {
      const { page = 1, pageSize = 5 , search } = data
      if (search) {
        var re = new RegExp('^' + search + '', "i");
        const productCount = await this.productInventoryModel.find({quantity:re}).count();
        const product = await this.productInventoryModel.find({quantity:re }).limit(pageSize).skip((page - 1) * pageSize);
        let productData = {
          success: true,
          data: product,
          totel_product: productCount,
          Count: product.length,
          page: page,
          total_page: Math.ceil(productCount / pageSize)
        };

        return productData;
      }
      const productCount = await this.productInventoryModel.find().count();
      const product = await this.productInventoryModel.find().limit(pageSize).skip((page - 1) * pageSize);
      let productData = {
        success: true,
        data: product,
        totel_product: productCount,
        Count: product.length,
        page: page,
        total_page: Math.ceil(productCount / pageSize)
      };
      return productData;
    } catch (error) {
      return error
    }
  }

 async findOne(id: string) {
    return this.productInventoryModel.findById(id);
  }

  async update(id: string, updateProductInventoryDto: UpdateProductInventoryDto) {
    try {
      const existingProduct = await this.productInventoryModel.findByIdAndUpdate(id, updateProductInventoryDto, { new: true });
      if (!existingProduct) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingProduct;
    } catch (error) {
      return error
    }
  }
  async remove(id: string) {
    try {
      return this.productInventoryModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      return error
    } 
  }
}
