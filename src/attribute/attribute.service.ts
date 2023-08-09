import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Attribute } from './entities/attribute.entity';
import { Model } from 'mongoose';
import { AttributeDocument } from 'src/attribute/entities/attribute.entity';
import { FilterDto } from 'src/user/filter-user.dto';

@Injectable()
export class AttributeService {
  constructor(@InjectModel(Attribute.name) private attributeModel: Model<AttributeDocument>) {
  }
 async create(createAttributeDto: CreateAttributeDto) {
    try {
      let savedData = await this.attributeModel.create(createAttributeDto)
      return {
        message: "Attribute created Successfully",
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
        const attributeCount = await this.attributeModel.find({
        "$or": [
            { name: re },
            { title: re }
        ]
    }).count();
        const attribute = await this.attributeModel.find({
        "$or": [
            { name: re },
            { title: re }
        ]
    }).limit(pageSize).skip((page - 1) * pageSize);
        let attributeData = {
          success: true,
          data: attribute,
          totel_attribute: attributeCount,
          Count: attribute.length,
          page: page,
          total_page: Math.ceil(attributeCount / pageSize)
        };

        return attributeData;
      }
      const attributeCount = await this.attributeModel.find().count();
      const attribute = await this.attributeModel.find().limit(pageSize).skip((page - 1) * pageSize);
      let attributeData = {
        success: true,
        data: attribute,
        totel_attribute: attributeCount,
        Count: attribute.length,
        page: page,
        total_page: Math.ceil(attributeCount / pageSize)
      };

      return attributeData;
    } catch (error) {
      return error
    }
  }

  findOne(id: string) {
    return this.attributeModel.findById(id);  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    try {
      const existingAttribute = await this.attributeModel.findByIdAndUpdate(id, updateAttributeDto, { new: true });
      if (!existingAttribute) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingAttribute;
    } catch (error) {
      return error
    }
  }

  remove(id: string) {
    try {
      return this.attributeModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      return error
    } 
  }
}
