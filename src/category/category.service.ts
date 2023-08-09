import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from "./entities/category.entity";
import { InjectModel } from "@nestjs/mongoose";
import { FilterDto } from './dto/filter-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      if (createCategoryDto.parent_category) {
        let categoryId = createCategoryDto.parent_category;
        let checkExsiting =await this.categoryModel.findById(categoryId);
        if (!checkExsiting) {
          throw new BadRequestException({
            status: 401,
            error: "Parent category not found"
          });  
        }
      }
      let savedData = await this.categoryModel.create(createCategoryDto);
      
      return {
        message: "Category created Successfully",
        success: true,
        data: {
          id: savedData._id,
          name: savedData.name,
          parent_category: savedData.parent_category,
          status: savedData.status,
          createdAt: savedData.createdAt,
          updatedAt: savedData.updatedAt,
        }
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException({
          status: 400,
          error: "Name Already Exist"
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
      const { page = 1, pageSize = 10, parent_category } = data
      
      if (parent_category) {
        const categoryCout = await this.categoryModel.find({ parent_category:  parent_category=="null" ? null : parent_category}).count();
        const category = await this.categoryModel.find({ parent_category:  parent_category=="null" ? null : parent_category}).limit(pageSize).skip((page - 1) * pageSize).sort({updatedAt:-1 });
        let categoryData = {
          success: true,
          data: category,
          total_category: categoryCout,
          count: category.length,
          page: page,
          total_page: Math.ceil(categoryCout / pageSize)
        };

        return categoryData;
      }
      const categoryCout = await this.categoryModel.find().count();
      
      const category = await this.categoryModel.find().limit(pageSize).skip((page - 1) * pageSize).sort({updatedAt:-1 });
      let categoryData = {
        success: true,
        data: category,
        total_category: categoryCout,
        count: category.length,
        page: page,
        total_page: Math.ceil(categoryCout / pageSize)
      };
      return categoryData;
    } catch (error) {
      return error
    }
  }

  async findOne(id: string) {
    try {
      return this.categoryModel.findById(id);
    } catch (error) {
      throw new BadRequestException({
        status: 400,
        error: error
      });
      return error
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      console.log(updateCategoryDto);
      const existingCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
      if (!existingCategory) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingCategory;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException({
          status: 400,
          error: "Name Already Exist"
        });
      } else {
        throw new BadRequestException({
          status: 400,
          error: error.message
        });
      }
    }
  }

  async remove(id: string) {
    try {
      return this.categoryModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      return error
    }
  }

  async findByName(name: string): Promise<CreateCategoryDto | undefined> {
    try {
      return this.categoryModel.findOne({ name });
    } catch (error) {
      return error
    }
  }

  async uploadFile(file): Promise<string> {
    console.log(file);
    return file.path;
  } 
}
