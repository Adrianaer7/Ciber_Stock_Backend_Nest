import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { RequestConUsuario } from 'src/helpers/interfaces';
import { fileFilter } from 'src/helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/helpers/fileNamer.helper';
import { environments } from 'src/environments/environment';


@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) { }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('archivo', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/productos',
        filename: fileNamer,
      }),
      //limits: { fileSize: 50 * 1024 * 1024 }, // 50MB máximo
    })
  )
  guardarImagen(@Request() req: RequestConUsuario, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('La Imagen es Obligatoria')
    }
    const secureUrl = `${environments.BACKEND_URL}/static/productos/${file.filename}`;
    return { 
      secureUrl, 
      fileName: file.filename 
    };
  }

}
