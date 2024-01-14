import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Auth, User } from 'src/tools';
import { CreateAddressDto, UpdateAddressDto } from 'src/domain/dtos';
import { QueryParams } from 'src/domain/types';
import { Pagination } from 'src/tools/decorators/pagination.decorator';

@Auth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('create')
  public async create(
    @User('_id') userId: string,
    @Body() body: CreateAddressDto,
  ) {
    try {
      return this.addressService.create({ ...body, userId });
    } catch (error) {
      throw new InternalServerErrorException('Error while creating address');
    }
  }

  @Get('')
  public async find(@User('_id') userId: string) {
    return this.addressService.findAll({ userId }, null, {
      sort: { createdAt: -1 },
    });
  }

  @Get(':id')
  public async findOne(@User('_id') userId: string, @Param('id') _id: string) {
    return this.addressService.findOne({ userId, _id });
  }

  @Put(':id')
  public async updateOne(
    @Param('id') _id: string,
    @User('_id') userId: string,
    @Body() body: UpdateAddressDto,
  ) {
    return this.addressService.updateOne({ userId, _id }, body);
  }

  @Delete(':id')
  public async deleteOne(
    @User('_id') userId: string,
    @Param('id') _id: string,
  ) {
    return this.addressService.deleteOne({ userId, _id });
  }
}
