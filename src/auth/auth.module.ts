import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport/dist';
import { User, UserSchemas } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportLocalStrategy } from './passport.local-strategy';
import { RoleGuard } from './role.guard';

@Module({
  imports: [PassportModule, UserModule,
    JwtModule.register({
      secret: "asdfgjnhujlkewtcbchetyhgfhfed",
      signOptions: {
        expiresIn: "1d"
      }
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchemas }])
  ],
  controllers: [AuthController],
  providers: [PassportLocalStrategy, AuthService,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
