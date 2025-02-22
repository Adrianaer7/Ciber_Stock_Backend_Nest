import { Module } from '@nestjs/common';
import { FaltantesService } from './faltantes.service';
import { FaltantesController } from './faltantes.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from 'src/productos/entities/producto.entity';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos]),
    AuthModule,
    ProductosModule
  ],
  controllers: [FaltantesController],
  providers: [FaltantesService],
})
export class FaltantesModule {}
