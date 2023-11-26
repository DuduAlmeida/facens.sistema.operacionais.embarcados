import { ApiProperty } from '@nestjs/swagger';
import { validateRoomRent } from './validations';
import objects from 'src/utils/objects';
import { RoomRent } from './checkin.interface';
import { RoomCategory } from '../hotel/hotel.interface';

export interface CreateRoomRent {
  id: string;
  hotelId: string;
  cpf: string;
  name: string;
  checkinTime: Date;
  category: RoomCategory;
}

export class CreateRoomRentPayload implements CreateRoomRent {
  id: string;
  @ApiProperty()
  hotelId: string;
  @ApiProperty()
  category: RoomCategory;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  checkinTime: Date;

  constructor({ id, hotelId, cpf, name, checkinTime, category }: any) {
    this.id = id;
    this.hotelId = hotelId;
    this.cpf = cpf;
    this.name = name;
    this.checkinTime = checkinTime;
    this.category = category;
  }

  validate(): {
    hasError: boolean;
    message: string;
  } {
    return validateRoomRent(this.getRoom());
  }

  getRoom(): RoomRent {
    return {
      id: objects.generateUuid(),
      cpf: this.cpf,
      name: this.name,
      hotelId: this.hotelId,
      category: this.category,
      checkinTime: this.checkinTime,
    };
  }
}
