import { ApiProperty } from '@nestjs/swagger';
import { PackageResponse } from 'src/contracts/package/package.interface';
import {
  ErrorStructResponse,
  http_response_struct,
} from 'src/utils/http_response/interface';

export type FindAllProps = {
  cpf?: string;
};

export class HttpPackageResponse {
  @ApiProperty()
  data?: PackageResponse;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  error?: ErrorStructResponse;

  constructor(payload: http_response_struct<PackageResponse>) {
    const { data, message, error } = payload;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}

export class HttpPackageListResponse {
  @ApiProperty()
  data?: PackageResponse[];
  @ApiProperty()
  message?: string;
  @ApiProperty()
  error?: ErrorStructResponse;

  constructor(payload: http_response_struct<PackageResponse[]>) {
    const { data, message, error } = payload;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}
