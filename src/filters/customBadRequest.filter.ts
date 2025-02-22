import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException, NotFoundException, UnauthorizedException)
export class CustomBadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException | NotFoundException | UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    response.status(status).json({
      msg: Array.isArray(exceptionResponse.message) ? exceptionResponse.message[0] : exceptionResponse.message,
      error: exceptionResponse.error,
      statusCode: status,
    });
  }
}
