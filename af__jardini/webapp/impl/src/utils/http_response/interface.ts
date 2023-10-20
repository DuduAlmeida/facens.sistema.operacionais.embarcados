type http_response_struct<T> = {
  data?: T;
  message?: string;
  error?: {
    code?: string;
    message?: string;
  };
};

export class HttpResponse<T> {
  data?: T;
  message?: string;
  error?: {
    code?: string;
    message?: string;
  };

  constructor(payload: http_response_struct<T>) {
    const { data, message, error } = payload;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}
