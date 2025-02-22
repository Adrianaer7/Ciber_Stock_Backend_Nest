import { forwardRef, Module } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => ProductosModule)
  ],
  controllers: [ImagenesController],
  providers: [ImagenesService],
  exports: [ImagenesService]
})
export class ImagenesModule {}
