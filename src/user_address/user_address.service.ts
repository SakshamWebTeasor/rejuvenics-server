import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user_address.dto';
import { UpdateUserAddressDto } from './dto/update-user_address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAddress, UserAddressDocument } from './entities/user_address.entity';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class UserAddressService {
  constructor(@InjectModel(UserAddress.name) private useraddressModel: Model<UserAddressDocument>) {
  }
  async create(createUserAddressDto: CreateUserAddressDto) {
    try {
      let savedData = await this.useraddressModel.create(createUserAddressDto)
      return {
        message: "User Address created Successfully",
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
          const userCount = await this.useraddressModel.find({
          "$or": [
              { address_line1: re },
              { address_line2: re }
          ]
      }).count();
          const user = await this.useraddressModel.find({
          "$or": [
              { address_line1: re },
              { address_line2: re }
          ]
      }).limit(pageSize).skip((page - 1) * pageSize);
          let userData = {
            success: true,
            data: user,
            totel_user: userCount,
            Count: user.length,
            page: page,
            total_page: Math.ceil(userCount / pageSize)
          };
  
          return userData;
        }
        const userCount = await this.useraddressModel.find().count();
        const user = await this.useraddressModel.find().limit(pageSize).skip((page - 1) * pageSize);
        let userData = {
          success: true,
          data: user,
          totel_user: userCount,
          Count: user.length,
          page: page,
          total_page: Math.ceil(userCount / pageSize)
        };
  
        return userData;
      } catch (error) {
        return error
      }
    }

  async findOne(id: string) {
    return this.useraddressModel.findById(id);
  }

  async update(id: string, updateUserAddressDto: UpdateUserAddressDto) {
    try {
      console.log(updateUserAddressDto);
      const existingUser = await this.useraddressModel.findByIdAndUpdate(id, updateUserAddressDto, { new: true });
      if (!existingUser) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingUser;
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try{
      return this.useraddressModel.deleteOne({ _id: id }).exec();
    }
    catch (error) {
      return error
    } 
  }
}
