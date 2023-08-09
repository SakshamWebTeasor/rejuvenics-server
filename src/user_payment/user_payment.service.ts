import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserPaymentDto } from './dto/update-user_payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserPaymentDocument, UserPayment } from './entities/user_payment.entity';
import { Model } from 'mongoose';
import { FilterDto } from 'src/user/filter-user.dto';
import { CreateUserPaymentDto } from './dto/create-user_payment.dto';

@Injectable()
export class UserPaymentService {
  constructor(@InjectModel(UserPayment.name) private userpaymentModel: Model<UserPaymentDocument>) {
  }
  async create(CreateUserPaymentDto: CreateUserPaymentDto) {
    try {
      let savedData = await this.userpaymentModel.create(CreateUserPaymentDto)
      return {
        message: "User Payment created Successfully",
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
        const userCount = await this.userpaymentModel.find({
        "$or": [
            { user_id: re },
            { account_no: re }
        ]
    }).count();
        const user = await this.userpaymentModel.find({
        "$or": [
            { user_id: re },
            { account_no: re }
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
      const userCount = await this.userpaymentModel.find().count();
      const user = await this.userpaymentModel.find().limit(pageSize).skip((page - 1) * pageSize);
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
    return this.userpaymentModel.findById(id);
  }

  async update(id: string, UpdateUserPaymentDto: UpdateUserPaymentDto) {
    try {
      console.log(UpdateUserPaymentDto);
      const existingUser = await this.userpaymentModel.findByIdAndUpdate(id, UpdateUserPaymentDto, { new: true });
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
      return this.userpaymentModel.deleteOne({ _id: id }).exec();
    }
    catch (error) {
      return error
    } 
  }
}
