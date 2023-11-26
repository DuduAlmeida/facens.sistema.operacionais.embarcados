import { RoomRent } from '../roomRent/checkin.interface';
import { Hotel, HotelResponse } from './hotel.interface';
import { validateHotel } from './validations';

export type UpdateHotelPayload = Hotel;

export class UpdateHotelPayloadRequest extends HotelResponse {
  getHotel(id: string): Hotel {
    return {
      id,
      name: this.name,
      address: this.address,
      category: this.category,
      hasLunch: this.hasLunch,
      hasDinner: this.hasDinner,
      description: this.description,
      hasBreakfast: this.hasBreakfast,
      starsQuantity: this.starsQuantity,
      roomCategories: this.roomCategories,
      rentedRooms: [] as RoomRent[],
      parkingLotsQuantity: this.parkingLotsQuantity,
    };
  }

  validate(): {
    hasError: boolean;
    message: string;
  } {
    return validateHotel(this.getHotel(''));
  }
}
