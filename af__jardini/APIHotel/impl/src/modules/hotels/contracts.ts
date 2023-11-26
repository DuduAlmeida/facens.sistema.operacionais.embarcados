import { ApiProperty } from '@nestjs/swagger';
import {
  HotelCategory,
  HotelResponse,
  RoomCategory,
} from 'src/contracts/hotel/hotel.interface';
import { RoomRentResponse } from 'src/contracts/roomRent/checkin.interface';
import {
  ErrorStructResponse,
  http_response_struct,
} from 'src/utils/http_response/interface';

export type FindAllProps = {
  name?: string;
  category?: HotelCategory;
  roomCategories?: RoomCategory[];
};

export class HttpRoomRentResponse {
  @ApiProperty()
  data?: RoomRentResponse;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  error?: ErrorStructResponse;

  constructor(payload: http_response_struct<RoomRentResponse>) {
    const { data, message, error } = payload;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}

export class HttpHotelResponse {
  @ApiProperty()
  data?: HotelResponse;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  error?: ErrorStructResponse;

  constructor(payload: http_response_struct<HotelResponse>) {
    const { data, message, error } = payload;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}

export class HttpHotelListResponse {
  @ApiProperty()
  data?: HotelResponse[];
  @ApiProperty()
  message?: string;
  @ApiProperty()
  error?: ErrorStructResponse;

  constructor(payload: http_response_struct<HotelResponse[]>) {
    const { data, message, error } = payload;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}
