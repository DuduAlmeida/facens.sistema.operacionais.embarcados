import { Test, TestingModule } from '@nestjs/testing';
import { HotelsService } from './hotels.service';
import { Hotel } from 'src/contracts/hotel/hotel.interface';
import { HOTELS_MOCK } from 'src/mocks/hotel';

describe('HotelsService', () => {
  let service: HotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelsService],
    }).compile();

    service = module.get<HotelsService>(HotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const hotels = HOTELS_MOCK;
    it('should return all hotels when no filters are provided', () => {
      const result = service.findAll({});
      expect(result).toEqual(hotels);
    });

    it('should return hotels filtered by category', () => {
      const countLuxuosHotel = hotels.filter(
        (hotel) => hotel.category === 'luxuoso',
      );
      const result = service.findAll({ category: 'luxuoso' });
      expect(result.length).toEqual(countLuxuosHotel);
    });

    it('should return hotels filtered by room categories', () => {
      const countSingleBedHotel = hotels.filter((hotel) =>
        hotel.roomCategories.includes('1_single_bed'),
      );
      const result = service.findAll({ roomCategories: ['1_single_bed'] });
      expect(result.length).toEqual(countSingleBedHotel);
    });

    it('should return hotels filtered by both category and room categories', () => {
      const countFilteredHotel = hotels.filter(
        (hotel) =>
          hotel.roomCategories.includes('2_single_bed') &&
          hotel.category === 'econômico',
      );
      const result = service.findAll({
        category: 'econômico',
        roomCategories: ['2_single_bed'],
      });
      expect(result.length).toEqual(countFilteredHotel);
    });

    it('should return an empty array when no hotels match the filters', () => {
      const countFilteredHotel = hotels.filter((hotel) =>
        hotel.roomCategories.includes('1_single_bed'),
      );
      const result = service.findAll({
        category: 'econômico',
        roomCategories: ['2_single_bed', '1_couple_bed', '1_single_bed'],
      });
      expect(result.length).toEqual(countFilteredHotel);
    });
  });

  describe('findOne', () => {
    it('should return the hotel with the specified id', () => {
      const hotels = service.findAll({});

      const result = service.findOne('hotel2');
      expect(result).toEqual(hotels[1]);
    });

    it('should return undefined if no hotel matches the id', () => {
      const result = service.findOne('hotel4');
      expect(result).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should add a new hotel to the list', () => {
      const newHotel: Hotel = { ...HOTELS_MOCK[0], id: 'novo_hotel_criado' };

      const result = service.create(newHotel);

      expect(result).toEqual(newHotel);

      const hotels = service.findAll({});
      expect(hotels).toContain(newHotel);
    });
  });

  describe('delete', () => {
    it('should remove a new hotel from the list', () => {
      const hotelRemoved = HOTELS_MOCK[0];

      const result = service.delete(hotelRemoved.id);

      expect(result).toEqual(hotelRemoved);

      const hotels = service.findAll({});
      expect(hotels).not.toContain(hotelRemoved);
    });
  });
});
