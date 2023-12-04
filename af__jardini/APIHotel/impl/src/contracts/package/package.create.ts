import { ApiProperty } from '@nestjs/swagger';
import objects from 'src/utils/objects';
import { Package } from './package.interface';

export type CreatePackagePayload = Omit<Package, 'id'>;

export class CreatePackagePayloadRequest {
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

  constructor({ title, hotelID, flightID, eventID, cpf }: any) {
    this.cpf = cpf;
    this.title = title;
    this.flightID = flightID;
    this.eventID = eventID;
    this.hotelID = hotelID;
  }

  validate(): {
    hasError: boolean;
    message: string;
  } {
    if (!this.cpf) return { hasError: true, message: 'cpf é obrigatório' };
    if (!this.title) return { hasError: true, message: 'title é obrigatório' };
    if (!this.flightID)
      return { hasError: true, message: 'flightID é obrigatório' };
    if (!this.hotelID)
      return { hasError: true, message: 'hotelID é obrigatório' };
    if (!this.eventID)
      return { hasError: true, message: 'eventID é obrigatório' };

    return { hasError: false, message: '' };
  }

  getPackage(): Package {
    return {
      id: objects.generateUuid(),
      title: this.title,
      cpf: this.cpf,
      eventID: this.eventID,
      flightID: this.flightID,
      hotelID: this.hotelID,
    };
  }
}
