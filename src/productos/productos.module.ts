import { forwardRef, Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';
import { AuthModule } from 'src/auth/auth.module';
import { VentasModule } from 'src/ventas/ventas.module';
import { PorcentajesModule } from 'src/porcentajes/porcentajes.module';
import { ImagenesModule } from 'src/imagenes/imagenes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos]),
    forwardRef(() => VentasModule),
    forwardRef(() => ImagenesModule),
    AuthModule,
    PorcentajesModule
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService]
})
export class ProductosModule {}
