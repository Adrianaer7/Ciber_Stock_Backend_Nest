import { forwardRef, Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ventas } from './entities/venta.entity';
import { Productos } from 'src/productos/entities/producto.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { WebSocketModule } from 'src/web-socket/web-socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ventas]),
    forwardRef(() => ProductosModule),
    AuthModule,
    WebSocketModule
  ],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService]
})
export class VentasModule { }
