import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreatePackagePayloadRequest } from 'src/contracts/package/package.create';
import http_response from 'src/utils/http_response';
import { HttpPackageListResponse, HttpPackageResponse } from './contracts';
import { PackagesService } from './package.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  @ApiOperation({ summary: 'Faz a contratação de um pacote turístico' })
  @ApiResponse({
    status: 201,
    description: 'The package has been successfully reserved',
    type: HttpPackageResponse,
  })
  createPackage(
    @Body() payload: CreatePackagePayloadRequest,
  ): HttpPackageResponse {
    payload = new CreatePackagePayloadRequest(payload);

    const { hasError, message: errorMessage } = payload.validate();

    if (hasError) {
      return http_response.ResultError(errorMessage);
    }

    const response = this.packagesService.create(payload.getPackage());

    return http_response.ResultOk(
      response,
      'The package has been successfully reserved',
    ) as HttpPackageResponse;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um package por ID' })
  @ApiParam({ name: 'id', description: 'Package ID' })
  @ApiResponse({
    status: 200,
    description: 'The package has been successfully cancelled',
    type: HttpPackageResponse,
  })
  @ApiResponse({ status: 404, description: 'Package not found' })
  deletePackageById(@Param('id') id: string): HttpPackageResponse {
    const packageDeleted = this.packagesService.delete(id);

    return http_response.ResultOk(
      packageDeleted,
      'The package has been successfully cancelled',
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os pacotes reservados' })
  @ApiQuery({
    name: 'cpf',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The package has been successfully found',
    type: HttpPackageListResponse,
  })
  getAllPackages(@Query('cpf') cpf: string): HttpPackageListResponse {
    const packageList = this.packagesService.findAll({
      cpf,
    });

    return http_response.ResultOk(
      packageList,
      'The package has been successfully found',
    );
  }
}
