import { BadRequestException, NotFoundException, Injectable } from "@nestjs/common";
import { User, UserDocument } from "./user.entity";
import { Model } from 'mongoose';
import { UserDto } from "./user.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./user-update.dto";
import { FilterDto } from "./filter-user.dto";
import { ObjectId } from "bson";

var saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async findAll(data: FilterDto): Promise<any | null> {
    try {
      const { page = 1, pageSize = 5 , search } = data
      if (search) {
        var re = new RegExp('^' + search + '', "i");
        const userCount = await this.userModel.find({
        "$or": [
            { name: re },
            { email: re }
        ]
    }).count();
        const user = await this.userModel.find({
        "$or": [
            { name: re },
            { email: re }
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
      const userCount = await this.userModel.find().count();
      const user = await this.userModel.find().limit(pageSize).skip((page - 1) * pageSize);
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

  async findOne(id: string): Promise<UserDto> {
    return this.userModel.findById(id);
  }

  async create(user: User): Promise<any> {
    try {
      console.log(user);

      const { password, } = user;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);
      let savedData = await this.userModel.create({ ...user, password: hashPassword })
      return {
        message: "User created Successfully",
        success: true,
        data: {
          id: savedData._id,
          name: savedData.name,
          phone: savedData.phone,
          email: savedData.email,
        }
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException({
          status: 400,
          error: "Email/Phone Already Exist"
        });
      } else {
        throw new BadRequestException({
          status: 400,
          error: error.message
        });
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashPassword = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      updateUserDto.password = hashPassword;
    }

    try {
      console.log(updateUserDto);
      const existingCategory = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
      if (!existingCategory) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return existingCategory;
    } catch (error) {
      return error
    }
  }

  // Delete user
  async delete(id: String) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  async getUserByEmail(email: string): Promise<UserDto | undefined> {
    console.log(this.userModel.findOne({ email }).exec());
    return this.userModel.findOne({ email });
  }

  async getUserByPhone(phone: string): Promise<UserDto | undefined> {
    return this.userModel.findOne({ phone });
  }

  async findOrdersForThisUser(id: string): Promise<any> {
    const objectIdUserId = new ObjectId(id);
    return this.userModel.aggregate([
      {
        '$match': {
          '_id': objectIdUserId, // Match the converted ObjectId
        },
      },
      {
        '$lookup': {
          'from': 'orderdetails',
          'let': {
            'cropId': {
              '$toString': id
            }
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$user_id', '$$cropId'
                  ]
                }
              }
            }
          ],
          'as': 'orders'
        }
      },
    ])
  }
}