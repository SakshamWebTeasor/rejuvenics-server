import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingSessionDto } from './dto/create-shopping_session.dto';
import { UpdateShoppingSessionDto } from './dto/update-shopping_session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingDocument, ShoppingSession } from './entities/shopping_session.entity';
import { Model } from 'mongoose';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class ShoppingSessionService {
  constructor(@InjectModel(ShoppingSession.name) private shoppingModel: Model<ShoppingDocument>) {
  }
  async create(createShoppingSessionDto: CreateShoppingSessionDto) {
    try {
      let savedData = await this.shoppingModel.create(createShoppingSessionDto)
      return {
        message: "Shopping Session created Successfully",
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
          const shoppingCount = await this.shoppingModel.find({ user_id: re  }).count();
          const shopping = await this.shoppingModel.find({ user_id: re  }).limit(pageSize).skip((page - 1) * pageSize);
          let Data = {
            success: true,
            data: shopping,
            totel_user: shoppingCount,
            Count: shopping.length,
            page: page,
            total_page: Math.ceil(shoppingCount / pageSize)
          };
  
          return Data;
        }
        const shoppingCount = await this.shoppingModel.find().count();
        const shopping = await this.shoppingModel.find().limit(pageSize).skip((page - 1) * pageSize);
        let Data = {
          success: true,
          data: shopping,
          totel_user: shoppingCount,
          Count: shopping.length,
          page: page,
          total_page: Math.ceil(shoppingCount / pageSize)
        };
  
        return Data;
      } catch (error) {
        return error
      }
    }
  findOne(id: string) {
    return this.shoppingModel.findById(id);
  }

  async update(id: string, UpdateShoppingSessionDto: UpdateShoppingSessionDto) {
    try {
      const existingShopping = await this.shoppingModel.findByIdAndUpdate(id, UpdateShoppingSessionDto, { new: true });
      if (!existingShopping) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingShopping;
    } catch (error) {
      return error
    }
  }

  remove(id: string) {
    try{
      return this.shoppingModel.deleteOne({ _id: id }).exec();
    }
    catch (error) {
      return error
    } 
  }
}
