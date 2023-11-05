import { Hotel } from './hotel.interface';

export function validateHotel(
  payload: Hotel,
  { isValidatingId = false }: any = {},
): {
  hasError: boolean;
  message: string;
} {
  const isNameValid = payload.name.length > 3;

  if (!isNameValid) {
    return {
      hasError: true,
      message: 'name must have at least 3 characters',
    };
  }

  const isAddressValid = [
    !!payload.address.city,
    !!payload.address.country,
    !!payload.address.neighborhood,
    !!payload.address.state,
    !!payload.address.street,
    !!payload.address.zipNumber,
  ].includes(false);

  if (!isAddressValid) {
    return {
      hasError: true,
      message: 'address it is not filled correctly',
    };
  }

  const isIdInvalid = isValidatingId && !payload.id;
  if (isIdInvalid) {
    return {
      hasError: true,
      message: 'id it is invalid',
    };
  }

  const isStarsValid = payload.starsQuantity > 0 && payload.starsQuantity <= 5;
  if (!isStarsValid) {
    return {
      hasError: true,
      message: 'starsQuantity must be between 0 and 5',
    };
  }

  const isParkingLotsValid = [null, undefined].includes(
    payload.parkingLotsQuantity,
  )
    ? true
    : payload.parkingLotsQuantity > 0;
  if (!isParkingLotsValid) {
    return {
      hasError: true,
      message: 'parkingLotsQuantity must be greater than 0',
    };
  }

  const isRoomCategoriesValid =
    [null, undefined].includes(payload.roomCategories) ||
    !payload.roomCategories.length
      ? false
      : payload.roomCategories
          .map((roomCategory) =>
            ['1_single_bed', '2_single_bed', '1_couple_bed'].includes(
              roomCategory,
            ),
          )
          .includes(false);
  if (!isRoomCategoriesValid) {
    return {
      hasError: true,
      message:
        'roomCategories must be an array with "1_single_bed", "2_single_bed" or "1_couple_bed"',
    };
  }

  const isHotelCategoriesValid =
    [null, undefined].includes(payload.category) ||
    !['barato', 'econômico', 'luxuoso'].includes(payload.category);
  if (!isHotelCategoriesValid) {
    return {
      hasError: true,
      message:
        'category must be one of the three options "barato", "econômico" or "luxuoso"',
    };
  }

  return { hasError: false, message: '' };
}
