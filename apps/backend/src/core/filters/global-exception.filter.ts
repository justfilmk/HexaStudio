import {
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '@hexastudio/types';

/**
 * Global Exception Filter to ensure consistent API error responses.
 * Maps all exceptions to a standardized ApiResponse format.
 */
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse: ApiResponse<null> = {
      data: null,
      status: status,
      message: typeof message === 'object' 
        ? (message as any).message || 'An error occurred' 
        : message,
      error: exception instanceof Error ? exception.message : undefined,
    };

    response.status(status).json(errorResponse);
  }
}
