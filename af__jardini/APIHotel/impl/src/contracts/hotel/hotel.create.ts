import { ApiProperty } from '@nestjs/swagger';
import objects from 'src/utils/objects';
import { AddressResponse } from '../address/address.interface';
import { RoomRent, RoomRentResponse } from '../roomRent/checkin.interface';
import { Hotel, HotelCategory, RoomCategory } from './hotel.interface';
import { validateHotel } from './validations';

export type CreateHotelPayload = Omit<Hotel, 'id'>;

export class CreateHotelPayloadRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: AddressResponse;

  @ApiProperty()
  starsQuantity: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  hasBreakfast: boolean;

  @ApiProperty()
  hasLunch: boolean;

  @ApiProperty()
  hasDinner: boolean;

  @ApiProperty()
  category: HotelCategory;

  @ApiProperty()
  parkingLotsQuantity?: number;

  @ApiProperty()
  roomCategories: RoomCategory[];

  @ApiProperty()
  rentedRooms: RoomRentResponse[];

  constructor({
    name,
    address,
    starsQuantity,
    description,
    hasBreakfast,
    hasLunch,
    hasDinner,
    category,
    parkingLotsQuantity,
    roomCategories = [],
  }: any) {
    this.name = name;
    this.address = address;
    this.starsQuantity = starsQuantity;
    this.description = description;
    this.hasBreakfast = hasBreakfast;
    this.hasLunch = hasLunch;
    this.hasDinner = hasDinner;
    this.category = category;
    this.parkingLotsQuantity = parkingLotsQuantity;
    this.roomCategories = roomCategories;
    this.rentedRooms = [] as RoomRentResponse[];
  }

  validate(): {
    hasError: boolean;
    message: string;
  } {
    return validateHotel(this.getHotel());
  }

  getHotel(): Hotel {
    return {
      id: objects.generateUuid(),
      name: this.name,
      address: this.address,
      category: this.category,
      hasLunch: this.hasLunch,
      hasDinner: this.hasDinner,
      description: this.description,
      hasBreakfast: this.hasBreakfast,
      starsQuantity: this.starsQuantity,
      roomCategories: this.roomCategories,
      rentedRooms: this.rentedRooms as RoomRent[],
      parkingLotsQuantity: this.parkingLotsQuantity,
    };
  }
}
