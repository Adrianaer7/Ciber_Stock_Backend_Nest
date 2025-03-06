import { Module } from '@nestjs/common';
import { FaltantesService } from './faltantes.service';
import { FaltantesController } from './faltantes.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from 'src/productos/entities/producto.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { WebSocketModule } from 'src/web-socket/web-socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos]),
    AuthModule,
    ProductosModule,
    WebSocketModule
  ],
  controllers: [FaltantesController],
  providers: [FaltantesService],
})
export class FaltantesModule {}
