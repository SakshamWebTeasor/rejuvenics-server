import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserAddressModule } from './user_address/user_address.module';
import { UserPaymentModule } from './user_payment/user_payment.module';
import { ShoppingSessionModule } from './shopping_session/shopping_session.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { PaymentDetailsModule } from './payment_details/payment_details.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { ProductInventoryModule } from './product_inventory/product_inventory.module';
import { DiscountModule } from './discount/discount.module';
import { AppModule } from './app/app.module';
import { MulterModule } from '@nestjs/platform-express';
import { CouponModule } from './coupon/coupon.module';
import { AttributeModule } from './attribute/attribute.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({ uri: configService.get("MONGO_URL") }),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    UserAddressModule,
    UserPaymentModule,
    ShoppingSessionModule,
    CartItemModule,
    PaymentDetailsModule,
    OrderDetailsModule,
    OrderItemsModule,
    ProductInventoryModule,
    DiscountModule,
    AppModule,
    CouponModule,
    AttributeModule
  ],
  controllers: [],
  providers: [],
})

export class RootModule {
  constructor() {
    console.log('working');
  }
}
