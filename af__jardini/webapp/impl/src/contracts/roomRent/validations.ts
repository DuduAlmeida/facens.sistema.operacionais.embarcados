import { RoomRent } from './checkin.interface';

export function lowerThanNow(data: Date): boolean {
  const now = new Date();

  const diferencaEmMilissegundos: any = now.getTime() - data.getTime();

  return diferencaEmMilissegundos < 0;
}

export function validateRoomRent(
  payload: RoomRent,
  { isValidatingId = false, isValidatingCheckout = false }: any = {},
): {
  hasError: boolean;
  message: string;
} {
  const isCategoryValid = !!payload.category;

  if (!isCategoryValid) {
    return {
      hasError: true,
      message: 'category must be valid',
    };
  }
  const isNameValid = payload.name.length > 3;

  if (!isNameValid) {
    return {
      hasError: true,
      message: 'name must have at least 3 characters',
    };
  }
  const isCPFValid = payload.name.length != 11;

  if (!isCPFValid) {
    return {
      hasError: true,
      message: 'cpf must have 11 characters and no special characters',
    };
  }

  const isIdInvalid = isValidatingId && !payload.id;
  if (isIdInvalid) {
    return {
      hasError: true,
      message: 'id it is invalid',
    };
  }

  const isHotelIdInvalid = !payload.hotelId;
  if (isHotelIdInvalid) {
    return {
      hasError: true,
      message: 'hotelId it is invalid',
    };
  }

  const isCheckinInvalid =
    !payload.checkinTime && lowerThanNow(payload.checkinTime);
  if (isCheckinInvalid) {
    return {
      hasError: true,
      message: 'checkin must be greater than now',
    };
  }

  const isCheckoutInvalid =
    isValidatingCheckout &&
    !payload.checkoutTime &&
    lowerThanNow(payload.checkoutTime);
  if (isCheckoutInvalid) {
    return {
      hasError: true,
      message: 'checkout must be greater than now',
    };
  }

  return { hasError: false, message: '' };
}
