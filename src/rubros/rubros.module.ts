import { Module } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { RubrosController } from './rubros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubros } from './entities/rubro.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Productos } from 'src/productos/entities/producto.entity';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rubros, Productos]),
    AuthModule,
    ProductosModule
  ],
  controllers: [RubrosController],
  providers: [RubrosService],
})
export class RubrosModule {}
