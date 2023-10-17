import { Injectable } from '@nestjs/common';
import {
  Hotel,
  HotelCategory,
  RoomCategory,
} from 'src/contracts/hotel/hotel.interface';

@Injectable()
export class HotelsService {
  private hotels: Hotel[] = [];

  create(hotel: Hotel): Hotel {
    const newHotel: Hotel = { ...hotel };
    this.hotels.push(newHotel);
    return newHotel;
  }

  findAll(category?: HotelCategory, roomCategories?: RoomCategory[]): Hotel[] {
    let filteredHotels: Hotel[] = [...this.hotels];
    if (category) {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.category === category,
      );
    }
    if (roomCategories && roomCategories.length > 0) {
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
