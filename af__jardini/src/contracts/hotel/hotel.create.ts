import { Address } from '../address/address.interface';
import { Hotel, HotelCategory, RoomCategory } from './hotel.interface';
import objects from 'src/utils/objects';
import { validateHotel } from './validations';

export type CreateHotelPayload = Omit<Hotel, 'id'>;

export class CreateHotelPayloadRequest {
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
      parkingLotsQuantity: this.parkingLotsQuantity,
    };
  }
}
