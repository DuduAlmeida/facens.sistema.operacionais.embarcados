import { RoomRent } from './checkin.interface';

export function menorQueCincoMinutosAntes(data: Date): boolean {
  // Obtém a data atual
  const agora = new Date();

  // Obtém a diferença em milissegundos entre a data fornecida e o horário atual
  const diferencaEmMilissegundos: any = agora.getTime() - data.getTime();

  // Converte a diferença em minutos
  const diferencaEmMinutos = diferencaEmMilissegundos / 1000 / 60;

  // Verifica se a diferença é menor que 5 minutos
  if (diferencaEmMinutos < 5) {
    return true;
  } else {
    return false;
  }
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
    !payload.checkinTime && menorQueCincoMinutosAntes(payload.checkinTime);
  if (isCheckinInvalid) {
    return {
      hasError: true,
      message: 'checkin must be greater than now',
    };
  }

  const isCheckoutInvalid =
    isValidatingCheckout &&
    !payload.checkoutTime &&
    menorQueCincoMinutosAntes(payload.checkoutTime);
  if (isCheckoutInvalid) {
    return {
      hasError: true,
      message: 'checkout must be greater than now',
    };
  }

  return { hasError: false, message: '' };
}
