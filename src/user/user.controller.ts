  import { Body, Controller,Request, Delete, Get, Param, Post, Put, UseGuards, Session, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags,ApiBody, ApiQuery } from '@nestjs/swagger';
import { UpdateUserDto } from './user-update.dto';
import { UserRegisterDto } from './user-register.dto';
import { UserService } from './user.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { FilterDto } from './filter-user.dto';

@ApiBearerAuth()
@ApiTags('User Module')
@Controller('user')
@UseGuards(ThrottlerGuard)
export class UserController {
    constructor(private userServices: UserService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async addUsers(@Body() user : UserRegisterDto) {
        return await this.userServices.create(user);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiQuery({ type: FilterDto })
    async findAll(@Query() filter: any) {
        return await this.userServices.findAll(filter);
    }

    @Get(":id")
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param("id") id : string) {
        return await this.userServices.findOne(id);
    }

    @Put(":id")
    @UseGuards(AuthGuard('jwt'))
    async updateUsers(@Param("id") id : string ,@Body() updateuser :UpdateUserDto) {
        return await this.userServices.update(id,updateuser);
    }

    @Delete(":id")
    @UseGuards(AuthGuard('jwt'))
    async deleteUsers(@Param("id") id : string ) {
        return await this.userServices.delete(id);
    }

    @Get('orders/:id')
    @UseGuards(AuthGuard('jwt'))
    findOrdersForThisUser(@Param('id') id: string) {
        return this.userServices.findOrdersForThisUser(id);
    }
}