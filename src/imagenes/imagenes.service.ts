import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { generarId } from 'src/usuarios/helpers/generar';
import { ProductosService } from 'src/productos/productos.service';
import { RequestConUsuario } from 'src/helpers/interfaces';

@Injectable()
export class ImagenesService {
  constructor(
    @Inject(forwardRef(() => ProductosService))
    private readonly productosService: ProductosService
  ) { }


  async guardarImagen(req: RequestConUsuario, file: Express.Multer.File): Promise<void> {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo.');
    }

    // Ruta de almacenamiento de imágenes
    const rutaBase = path.resolve(process.cwd(), '../cliente/public/imagenes');

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(rutaBase)) {
      fs.mkdirSync(rutaBase, { recursive: true });
    }

    // Generar un nombre único para la imagen
    const extension = path.extname(file.originalname);
    const fileName = `${generarId()}${extension}`;  //multer le pone nombres muy grandes a los archivos que subo, para eso le creo yo el id

    // Generar la ruta
    const filePath = path.join(rutaBase, fileName);

    // Guardar el archivo 
    fs.writeFileSync(filePath, file.buffer);

    try {
      // Buscar el producto asociado a la imagen
      const producto = await this.productosService.findOneByImage(req, file.originalname);
      if (!producto) {
        throw new BadRequestException('Producto no encontrado');
      }

      // Actualizar el producto
      producto.imagen = fileName
      await this.productosService.editarUnProducto(req, producto._id.toString(), { producto });

    } catch (error) {
      throw new BadRequestException(`Error al actualizar el producto: ${error.message}`);
    }
  }

  async eliminarImagen(imagen: string) {
    try {
      const rutaBase = path.resolve(process.cwd(), '../cliente/public/imagenes');
      // Construir la ruta completa de la imagen
      const filePath = path.join(rutaBase, imagen);

      //  Verificar si el archivo existe antes de eliminarlo
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      throw new BadRequestException(`Error al eliminar la imagen: ${error.message}`);
    }
    return true
  }
}
