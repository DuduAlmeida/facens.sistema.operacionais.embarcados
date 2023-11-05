import { ApiProperty } from '@nestjs/swagger';

export class ErrorStructResponse {
  @ApiProperty()
  code?: string;
  @ApiProperty()
  message?: string;

  constructor(payload: any) {
    const { code, message } = payload;
    this.code = code;
    this.message = message;
  }
}

export type http_response_struct<T> = {
  data?: T;
  message?: string;
  error?: ErrorStructResponse;
};

export class HttpResponse<T> {
  @ApiProperty()
  data?: T;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  error?: ErrorStructResponse;

  constructor(payload: http_response_struct<T>) {
    const { data, message, error } = payload;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}
