import { BadRequestException, NotFoundException, Injectable  } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';
import { FilterDto } from './dto/filter-product.dto';
import { Multer } from 'multer';
import * as admin from 'firebase-admin';
import { firebaseConfig } from '../firebase.config';
@Injectable()
export class ProductService {
  // //private bucket = admin.storage().bucket();
  
  // constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
  //   // admin.initializeApp({
  //   //   credential: admin.credential.cert(firebaseConfig),
  //   // });
  //   // this.bucket = admin.storage().bucket();
  // }
  private bucket; //admin.storage().bucket();
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    admin.initializeApp(firebaseConfig);
    // admin.initializeApp(
    // {
    //   credential: admin.credential.cert(firebaseConfig),
    //   storageBucket: firebaseConfig.storageBucket;
    // }
    // );

    this.bucket = admin.storage().bucket();
  }

  async create(createProductDto: CreateProductDto){ 
    try {
      let savedData = await this.productModel.create(createProductDto)
      return {
        message: "Product created Successfully",
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
        const productCount = await this.productModel.find({
        "$or": [
            { title: re },
            { sku: re }
        ]
    }).count();
        const product = await this.productModel.find({
        "$or": [
            { title: re },
            { sku: re }
        ]
    }).limit(pageSize).skip((page - 1) * pageSize);
        let productData = {
          success: true,
          data: product,
          totel_product: productCount,
          Count: product.length,
          page: page,
          total_page: Math.ceil(productCount / pageSize)
        };

        return productData;
      }
      const productCount = await this.productModel.find().count();
      const product = await this.productModel.find().limit(pageSize).skip((page - 1) * pageSize);
      let productData = {
        success: true,
        data: product,
        totel_product: productCount,
        Count: product.length,
        page: page,
        total_page: Math.ceil(productCount / pageSize)
      };

      return productData;
    } catch (error) {
      return error
    }
  }

 async findOne(id: string) {
    return this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      console.log(updateProductDto);
      const existingProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
      if (!existingProduct) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return existingProduct;
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      return this.productModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      return error
    } 
   }
  //  async uploadFile(file): Promise<string> {
  //   console.log(file);
  //   return file.path;
  // }
 
    async uploadFile(fileBuffer: Buffer, filename: string): Promise<string> {
      try{
        const file = this.bucket.file(filename);
        console.log("file",filename);
        
        await file.save(fileBuffer, {
          metadata: {
            contentType: 'image/jpg',
          },
        });
        const [metadata] = await file.getMetadata();
        return metadata.mediaLink;
      } catch (error) {
        console.log("chk", error);
        
        return error
      } 
     
    }
  
}
