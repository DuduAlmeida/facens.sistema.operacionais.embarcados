import {
  HotelCategory,
  RoomCategory,
} from 'src/contracts/hotel/hotel.interface';

export type FindAllProps = {
  name?: string;
  category?: HotelCategory;
  roomCategories?: RoomCategory[];
};
