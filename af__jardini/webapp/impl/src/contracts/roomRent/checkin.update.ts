import { ApiProperty } from '@nestjs/swagger';
import { menorQueCincoMinutosAntes } from './validations';

export interface UpdateRoomRent {
  id: string;
  hotelId: string;
  checkoutTime: Date;
}

export class UpdateRoomRentResponse implements UpdateRoomRent {
  @ApiProperty()
  checkoutTime: Date;
  @ApiProperty()
  id: string;
  @ApiProperty()
  hotelId: string;

  constructor({ checkoutTime, id, hotelId }: any) {
    this.checkoutTime = checkoutTime;
    this.hotelId = hotelId;
    this.id = id;
  }

  validate(): {
    hasError: boolean;
    message: string;
  } {
    const isIdInvalid = !this.id;
    if (isIdInvalid) {
      return {
        hasError: true,
        message: 'id it is invalid',
      };
    }

    const isHotelIdInvalid = !this.hotelId;
    if (isHotelIdInvalid) {
      return {
        hasError: true,
        message: 'hotelId it is invalid',
      };
    }

    const isCheckoutInvalid =
      !this.checkoutTime && menorQueCincoMinutosAntes(this.checkoutTime);
    if (isCheckoutInvalid) {
      return {
        hasError: true,
        message: 'checkout must be greater than now',
      };
    }

    return {
      hasError: false,
      message: '',
    };
  }
}
