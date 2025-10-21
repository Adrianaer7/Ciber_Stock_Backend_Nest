import { forwardRef, Module } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { RubrosController } from './rubros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubros } from './entities/rubro.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductosModule } from 'src/productos/productos.module';
import { WebSocketModule } from 'src/web-socket/web-socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rubros]),
    forwardRef(() => ProductosModule),
    AuthModule,
    ProductosModule,
    WebSocketModule
  ],
  controllers: [RubrosController],
  providers: [RubrosService],
})
export class RubrosModule { }
