import { Module } from '@nestjs/common';
import { GarantiasService } from './garantias.service';
import { GarantiasController } from './garantias.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Garantias } from './entities/garantia.entity';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Garantias]),
    AuthModule,
    ProductosModule
  ],
  controllers: [GarantiasController],
  providers: [GarantiasService],
})
export class GarantiasModule {}
