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
import { CreateHotelPayloadRequest } from 'src/contracts/hotel/hotel.create';
import { HttpResponse } from 'src/utils/http_response/interface';
import http_response from 'src/utils/http_response';
import { UpdateHotelPayloadRequest } from 'src/contracts/hotel/hotel.update';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiResponse({
    status: 201,
    description: 'The hotel has been successfully created',
    type: HttpResponse<HotelResponse>,
  })
  createHotel(@Body() payload: CreateHotelPayloadRequest): HttpResponse<Hotel> {
    const { hasError, message: errorMessage } = payload.validate();

    if (hasError) {
      return http_response.ResultError(errorMessage);
    }

    const hotelCreated = this.hotelsService.create(payload.getHotel());

    return http_response.ResultOk(
      hotelCreated,
      'The hotel has been successfully created',
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
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
    @Query('name') name?: string,
    @Query('category') category?: HotelCategory,
    @Query('roomCategories') roomCategories?: RoomCategory[],
  ): Hotel[] {
    if (roomCategories) roomCategories = JSON.parse(roomCategories as any);

    return this.hotelsService.findAll({ name, category, roomCategories });
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
  updateHotelById(
    @Param('id') id: string,
    @Body() payload: UpdateHotelPayloadRequest,
  ): HttpResponse<Hotel> {
    const { hasError, message: errorMessage } = payload.validate();

    if (hasError) {
      return http_response.ResultError(errorMessage);
    }
    const hotelUpdated = this.hotelsService.update(id, payload.getHotel(id));

    if (!hotelUpdated) {
      return http_response.ResultError('Hotel not found', 'not-found');
    }

    return http_response.ResultOk(
      hotelUpdated,
      'The hotel has been successfully updated',
    );
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
