import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDetail, OrderDetailDocument } from './entities/order_detail.entity';
import { FilterDto } from 'src/order_details/dto/filter-order_detail.dto';

@Injectable()
export class OrderDetailsService {
  constructor(@InjectModel(OrderDetail.name) private orderDetailsModel: Model<OrderDetailDocument>) {
  }
  
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    try {
      let savedData = await this.orderDetailsModel.create(createOrderDetailDto)
      return {
        message: "Order Details created Successfully",
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
    const { page, pageSize, search, startDate, endDate, status } = data
    console.log('data:', data)
    let searchOpr: any = {}
    let arrayA = ['1', '2', '3', '4']
    let filterDateOpr = {}
    let perPageLimit = 10
    let currentPage = 1
    if (search) {
      searchOpr.userName = new RegExp(search, "i");
    }
    if (status != 0) {
      if(status != undefined){
        arrayA = [status.toString()]
      }
      searchOpr.status = {
        '$in': arrayA
      }
    }
    if (startDate || endDate) {
      filterDateOpr = {
        '$and': [
          {
            'createdAt': {
              '$gte': new Date(startDate)
            }
          }, {
            'createdAt': {
              '$lte': new Date(endDate)
            }
          }
        ]
      }
    }
    if (pageSize) {
      perPageLimit = parseInt(pageSize.toString())
    }
    if (page) {
      currentPage = isNaN(parseInt(page.toString())) ? 1 : parseInt(page.toString())
    }
    let skip = isNaN((currentPage - 1) * perPageLimit) ? 0 : (currentPage - 1) * perPageLimit < 0 ? 0 : (currentPage - 1) * perPageLimit
    let agg = [
      {
        '$match': filterDateOpr
      },
      {
        '$addFields': {
          'tempId': {
            '$toObjectId': "$user_id"
          }
        }
      },
      {
        '$lookup': {
          'from': 'users',
          'let': {
            'cropId': '$tempId'
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', '$$cropId'
                  ]
                }
              }
            }
          ],
          'as': 'userDetail'
        }
      },
      {
        '$unwind': '$userDetail'
      },
      {
        '$addFields': {
          'userName': '$userDetail.name'
        }
      },
      {
        '$project': {
          'user_id': 0
        }
      },
      {
        '$match': searchOpr
      }
    ]
    console.log("searchOpr:", searchOpr)
    let aggCount = (await this.orderDetailsModel.aggregate([...agg, { '$count': 'count' }]))
    let count = aggCount.length == 0 ? 0 : aggCount[0].count
    let dataShow = (await this.orderDetailsModel.aggregate([...agg, {
      '$skip': skip
    }, {
      '$limit': perPageLimit
    }]));
    let orderData = {
      success: count == 0 ? false : true,
      data: dataShow,
      totel_order: count,
      Count: dataShow.length,
      page: count == 0 ? 0 : currentPage,
      total_page: Math.ceil(count / perPageLimit)
    };
    return orderData
  }


  async findOne(id: string) {
    return this.orderDetailsModel.findById(id);
  }
  
  // async findByUserId(id: string) {
  //   try {
  //     const User = await this.orderDetailsModel.find({ user_id: id});
  //     console.log(id, User);
  //     return User;
  //   } catch (error: any) {
  //     console.log(error)
  //   }
  // }

  async findByUserId(userId: string, data: FilterDto) {
    const { page, pageSize, search, startDate, endDate } = data
    let searchOpr = {}
    let filterDateOpr = {}
    let perPageLimit = 10
    let currentPage = 1
    if (search) {
      searchOpr = {
        'userName': new RegExp(search, "i")
      }
    }
    if (startDate || endDate) {
      filterDateOpr = {
        '$and': [
          {
            'createdAt': {
              '$gte': startDate
            }
          }, {
            'createdAt': {
              '$lte': endDate
            }
          }
        ]
      }
    }
    if (pageSize) {
      perPageLimit = parseInt(pageSize.toString())
    }
    if (page) {
      currentPage = parseInt(page.toString())
    }
    let agg = [
      {
        '$match': {
          'user_id': userId
        }
      },
      {
        '$match': filterDateOpr
      }, 
      {
        '$lookup': {
          'from': 'users',
          'let': {
            'cropId': {
              '$toObjectId': userId
            }
          },
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', '$$cropId'
                  ]
                }
              }
            }
          ],
          'as': 'userDetail'
        }
      },
      {
        '$unwind': '$userDetail'
      },
      {
        '$addFields': {
          'userName': '$userDetail.name'
        }
      },
      {
        '$match': searchOpr
      },
      {
        '$project': {
          'user_id': 0
        }
      }
    ]
    let aggCount = (await this.orderDetailsModel.aggregate([...agg, { '$count': 'count' }]))
    let count = aggCount.length == 0 ? 0 : aggCount[0].count
    let dataShow = (await this.orderDetailsModel.aggregate([...agg, {
      '$skip': (currentPage - 1) * perPageLimit
    }, {
      '$limit': perPageLimit
    }]));
    let orderData = {
      success: count == 0 ? false : true,
      data: dataShow,
      totel_order: count,
      Count: dataShow.length,
      page: count == 0 ? 0 : currentPage,
      total_page: Math.ceil(count / perPageLimit)
    };
    return orderData
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    try {
      const existingOrder = await this.orderDetailsModel.findByIdAndUpdate(id, updateOrderDetailDto, { new: true });
      if (!existingOrder) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingOrder;
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      return this.orderDetailsModel.deleteOne({ _id: id }).exec();
    }
    catch (error) {
      return error
    }
  }
}
