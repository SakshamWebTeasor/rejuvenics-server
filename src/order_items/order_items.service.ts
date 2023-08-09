import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { OrderItem, OrderItemDocument } from './entities/order_item.entity';
import { Model } from 'mongoose';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class OrderItemsService {
  constructor(@InjectModel(OrderItem.name) private orderItemModel: Model<OrderItemDocument>) {
  }
  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      let savedData = await this.orderItemModel.create(createOrderItemDto)
      return {
        message: "Order Items created Successfully",
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
          const orderCount = await this.orderItemModel.find({
          "$or": [
              { order_id: re },
              { product_id: re }
          ]
      }).count();
          const order = await this.orderItemModel.find({
          "$or": [
              { order_id: re },
              { product_id: re }
          ]
      }).limit(pageSize).skip((page - 1) * pageSize);
          let orderData = {
            success: true,
            data: order,
            totel_order: orderCount,
            Count: order.length,
            page: page,
            total_page: Math.ceil(orderCount / pageSize)
          };
  
          return orderData;
        }
        const orderCount = await this.orderItemModel.find().count();
        const order = await this.orderItemModel.find().limit(pageSize).skip((page - 1) * pageSize);
        let orderData = {
          success: true,
          data: order,
          totel_order: orderCount,
          Count: order.length,
          page: page,
          total_page: Math.ceil(orderCount / pageSize)
        };
  
        return orderData;
      } catch (error) {
        return error
      }
    }
  
  async findOne(id: string) {
      return this.orderItemModel.findById(id);
    }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      const existingOrder = await this.orderItemModel.findByIdAndUpdate(id, updateOrderItemDto, { new: true });
      if (!existingOrder) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingOrder;
    } catch (error) {
      return error
    }
  } 

  async remove(id: string) {
    try{
      return this.orderItemModel.deleteOne({ _id: id }).exec();
    }
    catch (error) {
      return error
    } 
  }
}
