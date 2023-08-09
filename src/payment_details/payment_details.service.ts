import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreatePaymentDetailDto } from './dto/create-payment_detail.dto';
import { UpdatePaymentDetailDto } from './dto/update-payment_detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentDetail, PaymentDetailDocument } from './entities/payment_detail.entity';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class PaymentDetailsService {
  constructor(@InjectModel(PaymentDetail.name) private paymentDetailsModel: Model<PaymentDetailDocument>) {
  }
  async create(createPaymentDetailDto: CreatePaymentDetailDto) {
    try {
      let savedData = await this.paymentDetailsModel.create(createPaymentDetailDto)
      return {
        message: "Payment Details created Successfully",
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
          const paymentCount = await this.paymentDetailsModel.find({
          "$or": [
              { order_id: re },
              { amount: re }
          ]
      }).count();
          const payment = await this.paymentDetailsModel.find({
          "$or": [
              { order_id: re },
              { amount: re }
          ]
      }).limit(pageSize).skip((page - 1) * pageSize);
          let paymentData = {
            success: true,
            data: payment,
            totel_payment: paymentCount,
            Count: payment.length,
            page: page,
            total_page: Math.ceil(paymentCount / pageSize)
          };
  
          return paymentData;
        }
        const paymentCount = await this.paymentDetailsModel.find().count();
        const payment = await this.paymentDetailsModel.find().limit(pageSize).skip((page - 1) * pageSize);
        let paymentData = {
          success: true,
          data: payment,
          totel_payment: paymentCount,
          Count: payment.length,
          page: page,
          total_page: Math.ceil(paymentCount / pageSize)
        };
  
        return paymentData;
      } catch (error) {
        return error
      }
    }
  
  async findOne(id: string) {
      return this.paymentDetailsModel.findById(id);
    }
  
  async update(id: string, updatePaymentDetailDto: UpdatePaymentDetailDto) {
    try {
      console.log(updatePaymentDetailDto);
      const existingpayment = await this.paymentDetailsModel.findByIdAndUpdate(id, updatePaymentDetailDto, { new: true });
      if (!existingpayment) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingpayment;
    } catch (error) {
      return error
    }
  } 

  async remove(id: string) {
    try{
      return this.paymentDetailsModel.deleteOne({ _id: id }).exec();
    }
    catch (error) {
      return error
    } 
  }
}
