import { Injectable } from '@nestjs/common';
import { Hotel } from 'src/contracts/hotel/hotel.interface';
import { HOTELS_MOCK } from 'src/mocks/hotel';
import { FindAllProps } from './contracts';

@Injectable()
export class HotelsService {
  private hotels: Hotel[] = HOTELS_MOCK;

  create(hotel: Hotel): Hotel {
    const newHotel: Hotel = { ...hotel };
    this.hotels.push(newHotel);
    return newHotel;
  }

  findAll({ category, roomCategories = [], name }: FindAllProps): Hotel[] {
    let filteredHotels: Hotel[] = [...this.hotels];

    if (!!name) {
      console.log('Entrou no filtro de hotel name');
      filteredHotels = filteredHotels.filter((hotel) =>
        hotel.name.toLowerCase().indexOf(name.toLowerCase()),
      );
    }

    if (!!category) {
      console.log('Entrou no filtro de hotel category');
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.category === category,
      );
    }

    if (
      !!roomCategories &&
      Array.isArray(roomCategories) &&
      roomCategories.length
    ) {
      console.log(
        'Entrou no filtro de room categories',
        roomCategories,
        roomCategories.length,
        roomCategories.length > 0,
      );

      filteredHotels = filteredHotels.filter((hotel) =>
        hotel.roomCategories.some((roomCategory) =>
          roomCategories.includes(roomCategory),
        ),
      );
    }

    return filteredHotels;
  }

  findOne(id: string): Hotel {
    return this.hotels.find((hotel) => hotel.id === id);
  }

  update(id: string, hotel: Hotel): Hotel {
    const index = this.hotels.findIndex((hotel) => hotel.id === id);
    if (index >= 0) {
      const updatedHotel: Hotel = { ...hotel, id };
      this.hotels[index] = updatedHotel;
      return updatedHotel;
    }

    return null;
  }

  delete(id: string): Hotel {
    const index = this.hotels.findIndex((hotel) => hotel.id === id);
    if (index >= 0) {
      const deletedHotel = this.hotels[index];
      this.hotels.splice(index, 1);
      return deletedHotel;
    }

    return null;
  }
}
