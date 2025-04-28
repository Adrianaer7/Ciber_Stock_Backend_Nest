import { Module } from '@nestjs/common';
import { CodigosService } from './codigos.service';
import { CodigosController } from './codigos.controller';
import { ProductosModule } from 'src/productos/productos.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ProductosModule
  ],
  controllers: [CodigosController],
  providers: [CodigosService],
})
export class CodigosModule { }
