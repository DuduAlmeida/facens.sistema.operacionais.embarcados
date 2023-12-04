import { ApiProperty } from '@nestjs/swagger';

export type Package = {
  id: string;
  cpf: string;
  title: string;
  eventID: string;
  hotelID: string;
  flightID: string;
};

export class PackageResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  flightID: string;
  @ApiProperty()
  eventID: string;
  @ApiProperty()
  hotelID: string;

  constructor({ id, title, hotelID, flightID, eventID, cpf }: any) {
    this.id = id;
    this.cpf = cpf;
    this.title = title;
    this.flightID = flightID;
    this.eventID = eventID;
    this.hotelID = hotelID;
  }
}
