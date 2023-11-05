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

import { CreateHotelPayloadRequest } from 'src/contracts/hotel/hotel.create';
import { UpdateHotelPayloadRequest } from 'src/contracts/hotel/hotel.update';
import http_response from 'src/utils/http_response';
import {
  HotelCategory,
  RoomCategory,
} from '../../contracts/hotel/hotel.interface';
import { HttpHotelListResponse, HttpHotelResponse } from './contracts';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @ApiOperation({ summary: 'Adiciona um no hotel na aplicação' })
  @ApiResponse({
    status: 201,
    description: 'The hotel has been successfully created',
    type: HttpHotelResponse,
  })
  createHotel(@Body() payload: CreateHotelPayloadRequest): HttpHotelResponse {
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
  @ApiOperation({ summary: 'Lista todos os hotéis' })
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
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully found',
    type: HttpHotelListResponse,
  })
  getAllHotels(
    @Query('name') name?: string,
    @Query('category') category?: HotelCategory,
    @Query('roomCategories') roomCategories?: RoomCategory[],
  ): HttpHotelListResponse {
    if (roomCategories) roomCategories = JSON.parse(roomCategories as any);

    const hotelList = this.hotelsService.findAll({
      name,
      category,
      roomCategories,
    });

    return http_response.ResultOk(
      hotelList,
      'The hotel has been successfully found',
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna as informações do hotel por ID' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully found',
    type: HttpHotelResponse,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found' })
  getHotelById(@Param('id') id: string): HttpHotelResponse {
    const hotelFound = this.hotelsService.findOne(id);

    return http_response.ResultOk(
      hotelFound,
      'The hotel has been successfully found',
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um hotel por ID' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully updated',
    type: HttpHotelResponse,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found' })
  updateHotelById(
    @Param('id') id: string,
    @Body() payload: UpdateHotelPayloadRequest,
  ): HttpHotelResponse {
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
  @ApiOperation({ summary: 'Remove um hotel por ID' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully deleted',
    type: HttpHotelResponse,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found' })
  deleteHotelById(@Param('id') id: string): HttpHotelResponse {
    const hotelDeleted = this.hotelsService.delete(id);

    return http_response.ResultOk(
      hotelDeleted,
      'The hotel has been successfully deleted',
    );
  }
}
