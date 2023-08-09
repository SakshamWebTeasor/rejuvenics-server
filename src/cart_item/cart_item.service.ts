import { BadRequestException , Injectable ,NotFoundException} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CartItem, CartItemDocument } from './entities/cart_item.entity';
import { Model } from 'mongoose';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class CartItemService {
  constructor(@InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>) {
  }
 async create(createCartItemDto: CreateCartItemDto) {
  try {
    let savedData = await this.cartItemModel.create(createCartItemDto)
    return {
      message: "Cart Item created Successfully",
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
        const itemCount = await this.cartItemModel.find({ session_id: re  }).count();
        const item = await this.cartItemModel.find({ session_id: re  }).limit(pageSize).skip((page - 1) * pageSize);
        let Data = {
          success: true,
          data: item,
          totel_user: itemCount,
          Count: item.length,
          page: page,
          total_page: Math.ceil(itemCount / pageSize)
        };

        return Data;
      }
      const itemCount = await this.cartItemModel.find().count();
      const item = await this.cartItemModel.find().limit(pageSize).skip((page - 1) * pageSize);
      let Data = {
        success: true,
        data: item,
        totel_user: itemCount,
        Count: item.length,
        page: page,
        total_page: Math.ceil(itemCount / pageSize)
      };

      return Data;
    } catch (error) {
      return error
    }
  }
findOne(id: string) {
  return this.cartItemModel.findById(id);
}

async update(id: string, updateCartItemDto: UpdateCartItemDto) {
  try {
    const existingItem = await this.cartItemModel.findByIdAndUpdate(id, updateCartItemDto, { new: true });
    if (!existingItem) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return existingItem;
  } catch (error) {
    return error
  }
}

  remove(id: string) {
    try{
      return this.cartItemModel.deleteOne({ _id: id }).exec();
    }
    catch (error) {
      return error
    } 
  }
}
