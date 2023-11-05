import { ApiProperty } from '@nestjs/swagger';
import { Address, AddressResponse } from '../address/address.interface';

export type HotelCategory = 'barato' | 'econômico' | 'luxuoso';
export type RoomCategory = '1_single_bed' | '2_single_bed' | '1_couple_bed';

export type Hotel = {
  id: string;
  name: string;
  address: Address;
  starsQuantity: number;
  description: string;
  hasBreakfast: boolean;
  hasLunch: boolean;
  hasDinner: boolean;
  category: HotelCategory;
  parkingLotsQuantity?: number;
  roomCategories: RoomCategory[];
};

export class HotelResponse {
  @ApiProperty()
  id: string;
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

  constructor(
    id: string,
    name: string,
    address: Address,
    starsQuantity: number,
    description: string,
    hasBreakfast: boolean,
    hasLunch: boolean,
    hasDinner: boolean,
    category: HotelCategory,
    parkingLotsQuantity?: number,
    roomCategories: RoomCategory[] = [],
  ) {
    this.id = id;
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
  }
}
