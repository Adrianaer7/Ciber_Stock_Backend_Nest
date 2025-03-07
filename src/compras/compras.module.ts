import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from 'src/productos/entities/producto.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Compras } from './entities/compra.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { WebSocketModule } from 'src/web-socket/web-socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compras, Productos]),
    AuthModule,
    ProductosModule,
    WebSocketModule
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
