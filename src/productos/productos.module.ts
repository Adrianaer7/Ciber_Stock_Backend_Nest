import { forwardRef, Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';
import { AuthModule } from 'src/auth/auth.module';
import { VentasModule } from 'src/ventas/ventas.module';
import { PorcentajesModule } from 'src/porcentajes/porcentajes.module';
import { ImagenesModule } from 'src/imagenes/imagenes.module';
import { WebSocketModule } from 'src/web-socket/web-socket.module';
import { DolaresModule } from 'src/dolares/dolares.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos]),
    forwardRef(() => VentasModule),
    forwardRef(() => ImagenesModule),
    AuthModule,
    PorcentajesModule,
    WebSocketModule,
    DolaresModule
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService]
})
export class ProductosModule { }
