import { ApiProperty } from '@nestjs/swagger';
import { RoomCategory } from '../hotel/hotel.interface';

export interface RoomRent {
  id: string;
  hotelId: string;
  cpf: string;
  name: string;
  category: RoomCategory;
  checkinTime: Date;
  checkoutTime?: Date;
}

export class RoomRentResponse implements RoomRent {
  @ApiProperty()
  id: string;
  @ApiProperty()
  hotelId: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: RoomCategory;
  @ApiProperty()
  checkinTime: Date;
  @ApiProperty()
  checkoutTime: Date;

  constructor(
    id: string,
    hotelId: string,
    cpf: string,
    name: string,
    checkinTime: Date,
    checkoutTime: Date,
  ) {
    this.id = id;
    this.hotelId = hotelId;
    this.cpf = cpf;
    this.name = name;
    this.checkinTime = checkinTime;
    this.checkoutTime = checkoutTime;
  }
}
