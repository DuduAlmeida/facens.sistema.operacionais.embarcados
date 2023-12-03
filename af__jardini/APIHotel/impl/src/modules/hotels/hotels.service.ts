import { Injectable } from '@nestjs/common';
import { Hotel } from 'src/contracts/hotel/hotel.interface';
import { HOTELS_MOCK } from 'src/mocks/hotel';
import { FindAllProps } from './contracts';
import { RoomRent } from 'src/contracts/roomRent/checkin.interface';
import { UpdateRoomRent } from 'src/contracts/roomRent/checkin.update';

@Injectable()
export class HotelsService {
  private hotels: Hotel[] = HOTELS_MOCK;

  create(hotel: Hotel): Hotel {
    const newHotel: Hotel = { ...hotel };
    this.hotels.push(newHotel);
    return newHotel;
  }

  checkin(room: RoomRent): { room: RoomRent; errorMessage: string } {
    const hotelFound = this.hotels.find((hotel) => room.hotelId === hotel.id);

    if (!hotelFound) return { room, errorMessage: 'Hotel not found!' };
    if (!hotelFound.roomCategories.includes(room.category))
      return { room, errorMessage: 'Hotel doesnt have this category!' };

    this.hotels = this.hotels.map((hotel) => {
      if (room.hotelId === hotel.id) {
        hotel.rentedRooms.push(room);
      }

      return hotel;
    });

    return { room, errorMessage: '' };
  }

  checkout(payload: UpdateRoomRent): { room?: RoomRent; errorMessage: string } {
    const hotelFound = this.hotels.find(
      (hotel) => hotel.id === payload.hotelId,
    );
    if (!hotelFound) return { errorMessage: 'Hotel not found!' };

    const room = hotelFound.rentedRooms.find(
      (roomItem) => roomItem.id === payload.id,
    );
    if (!room) return { room, errorMessage: 'Room not found!' };

    this.hotels = this.hotels.map((hotel) => {
      if (room.hotelId === hotel.id) {
        hotel.rentedRooms = hotel.rentedRooms.map((roomItem) => {
          if (roomItem.id === payload.id) {
            roomItem.checkoutTime = new Date();
          }

          return roomItem;
        });
      }

      return hotel;
    });

    return { room, errorMessage: '' };
  }

  findAll({ category, roomCategories = [], name, cpf }: FindAllProps): Hotel[] {
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

    if (!!cpf) {
      console.log('Entrou no filtro de hotel cpf');
      const getByCpf = (rentedRoom) => rentedRoom?.cpf === cpf;

      filteredHotels = filteredHotels.filter((hotel) => {
        return hotel.rentedRooms.find(getByCpf);
      });

      filteredHotels = filteredHotels.map((hotel) => {
        hotel.rentedRooms = hotel.rentedRooms.filter(getByCpf);

        return hotel;
      });
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
      this.hotels[index] = {
        ...updatedHotel,
        rentedRooms: this.hotels[index].rentedRooms,
      };
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
