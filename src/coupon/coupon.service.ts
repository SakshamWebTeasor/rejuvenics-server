import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon, CouponDocument } from './entities/coupon.entity';
import { Model } from 'mongoose';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<CouponDocument>) {
  }
  async create(CreateCouponDto: CreateCouponDto) {
    try {
      let savedData = await this.couponModel.create(CreateCouponDto)
      return {
        message: "Coupon created Successfully",
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
        const couponCount = await this.couponModel.find({
        "$or": [
            { name: re },
            { code: re }
        ]
    }).count();
        const coupon = await this.couponModel.find({
        "$or": [
            { name: re },
            { code: re }
        ]
    }).limit(pageSize).skip((page - 1) * pageSize);
        let couponData = {
          success: true,
          data: coupon,
          totel_coupon: couponCount,
          Count: coupon.length,
          page: page,
          total_page: Math.ceil(couponCount / pageSize)
        };

        return couponData;
      }
      const couponCount = await this.couponModel.find().count();
      const coupon = await this.couponModel.find().limit(pageSize).skip((page - 1) * pageSize);
      let couponData = {
        success: true,
        data: coupon,
        totel_coupon: couponCount,
        Count: coupon.length,
        page: page,
        total_page: Math.ceil(couponCount / pageSize)
      };

      return couponData;
    } catch (error) {
      return error
    }
  }

 async findOne(id: string) {
    return this.couponModel.findById(id);
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    try {
      const existingCoupon = await this.couponModel.findByIdAndUpdate(id, updateCouponDto, { new: true });
      if (!existingCoupon) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingCoupon;
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      return this.couponModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      return error
    } 
   }
}
