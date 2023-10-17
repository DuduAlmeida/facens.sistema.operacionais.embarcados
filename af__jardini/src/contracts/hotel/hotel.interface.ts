import { Address } from '../address/address.interface';

export type HotelCategory = 'barato' | 'econômico' | 'luxuoso';
export type RoomCategory = '1_single_bed' | '2_single_bed' | '1_couple_bed';

export interface Hotel {
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
}

export class HotelResponse {
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
