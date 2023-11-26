import { ApiProperty } from '@nestjs/swagger';

export interface Address {
  city: string;
  street: string;
  zipNumber: string;
  number?: number;
  neighborhood: string;
  country: string;
  state: string;
  complement?: string;
}

export class AddressResponse {
  @ApiProperty()
  city: string;
  @ApiProperty()
  street: string;
  @ApiProperty()
  zipNumber: string;
  @ApiProperty()
  number?: number;
  @ApiProperty()
  neighborhood: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  complement?: string;

  constructor({
    city,
    street,
    zipNumber,
    neighborhood,
    country,
    state,
    number,
    complement,
  }: any) {
    this.city = city;
    this.street = street;
    this.zipNumber = zipNumber;
    this.number = number;
    this.neighborhood = neighborhood;
    this.country = country;
    this.state = state;
    this.complement = complement;
  }
}
