import {
  HotelCategory,
  RoomCategory,
} from 'src/contracts/hotel/hotel.interface';

export type FindAllProps = {
  category?: HotelCategory;
  roomCategories?: RoomCategory[];
};
