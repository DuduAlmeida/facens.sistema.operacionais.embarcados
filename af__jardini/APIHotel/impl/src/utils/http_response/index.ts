import { HttpResponse } from './interface';

function ResultOk<T>(response: T, message?: string): HttpResponse<T> {
  return {
    data: response,
    ...(message ? { message } : {}),
  };
}

function ResultError<T>(message?: string, code?: string): HttpResponse<T> {
  return {
    error: {
      ...(message ? { message } : {}),
      ...(code ? { code } : {}),
    },
  };
}

export default {
  ResultError,
  ResultOk,
};
