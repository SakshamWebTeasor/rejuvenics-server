import { BadRequestException, Injectable ,NotFoundException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Discount, DiscountDocument } from './entities/discount.entity';
import { Model } from 'mongoose';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Discount.name) private discountModel: Model<DiscountDocument>) {
  }
  async create(createDiscountDto: CreateDiscountDto) {
    try {
      let savedData = await this.discountModel.create(createDiscountDto)
      return {
        message: "Discount created Successfully",
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
        const discountCount = await this.discountModel.find({
        "$or": [
            { name: re },
            { description: re }
        ]
    }).count();
        const discount = await this.discountModel.find({
        "$or": [
            { name: re },
            { description: re }
        ]
    }).limit(pageSize).skip((page - 1) * pageSize);
        let discountData = {
          success: true,
          data: discount,
          totel_discount: discountCount,
          Count: discount.length,
          page: page,
          total_page: Math.ceil(discountCount / pageSize)
        };

        return discountData;
      }
      const discountCount = await this.discountModel.find().count();
      const discount = await this.discountModel.find().limit(pageSize).skip((page - 1) * pageSize);
      let discountData = {
        success: true,
        data: discount,
        totel_discount: discountCount,
        Count: discount.length,
        page: page,
        total_page: Math.ceil(discountCount / pageSize)
      };

      return discountData;
    } catch (error) {
      return error
    }
  }

 async findOne(id: string) {
    return this.discountModel.findById(id);
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    try {
      const existingdiscount = await this.discountModel.findByIdAndUpdate(id, updateDiscountDto, { new: true });
      if (!existingdiscount) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingdiscount;
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      return this.discountModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      return error
    } 
   }
}
