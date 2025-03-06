import { forwardRef, Module } from '@nestjs/common';
import { DolaresService } from './dolares.service';
import { DolaresController } from './dolares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dolares } from './entities/dolar.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dolares]),
    forwardRef(() => ProductosModule),
    AuthModule
  ],
  controllers: [DolaresController],
  providers: [DolaresService],
  exports: [DolaresService]
})
export class DolaresModule {}
