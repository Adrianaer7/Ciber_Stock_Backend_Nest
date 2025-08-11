import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) { }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: multer.memoryStorage(), // Almacena en buffer
      limits: { fileSize: 50 * 1024 * 1024 }, // 50MB máximo
    })
  )
  guardarImagen(@Request() req: RequestConUsuario, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('La Imagen es Obligatoria')
    }
    return this.imagenesService.guardarImagen(req, file);
  }

}
