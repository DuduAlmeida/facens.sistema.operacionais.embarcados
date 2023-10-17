import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import {
  Hotel,
  HotelCategory,
  HotelResponse,
  RoomCategory,
} from '../../contracts/hotel/hotel.interface';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiResponse({
    status: 201,
    description: 'The hotel has been successfully created',
    type: HotelResponse,
  })
  createHotel(@Body() hotel: Hotel): Hotel {
    return this.hotelsService.create(hotel);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  @ApiQuery({
    name: 'category',
    enum: ['barato', 'econômico', 'luxuoso'],
    required: false,
  })
  @ApiQuery({
    name: 'roomCategories',
    enum: ['1_single_bed', '2_single_bed', '1_couple_bed'],
    isArray: true,
    required: false,
  })
  getAllHotels(
    @Query('category') category?: HotelCategory,
    @Query('roomCategories') roomCategories?: RoomCategory[],
  ): Hotel[] {
    return this.hotelsService.findAll(category, roomCategories);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a hotel by ID' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully found',
    type: HotelResponse,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found' })
  getHotelById(@Param('id') id: string): Hotel {
    return this.hotelsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hotel by ID' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully updated',
    type: HotelResponse,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found' })
  updateHotelById(@Param('id') id: string, @Body() hotel: Hotel): Hotel {
    return this.hotelsService.update(id, hotel);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hotel by ID' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully deleted',
    type: HotelResponse,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found' })
  deleteHotelById(@Param('id') id: string): Hotel {
    return this.hotelsService.delete(id);
  }
}
