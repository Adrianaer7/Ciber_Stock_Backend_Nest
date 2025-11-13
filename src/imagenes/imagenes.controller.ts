import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestConUsuario } from 'src/helpers/interfaces';
import { fileFilter } from 'src/helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/helpers/fileNamer.helper';
import { environments } from 'src/environments/environment';


@Controller('imagenes')
export class ImagenesController {

  constructor() { }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors( //solo se ejecuta cuando existe un archivo
    FileInterceptor('archivo', {
      fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
      storage: diskStorage({
        destination: './static/productos',
        filename: fileNamer,
      })
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
