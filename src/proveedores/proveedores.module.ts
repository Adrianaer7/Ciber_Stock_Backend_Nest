import { forwardRef, Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedores } from './entities/proveedor.entity';
import { WebSocketModule } from 'src/web-socket/web-socket.module';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proveedores]),
    forwardRef(() => ProductosModule),
    AuthModule,
    WebSocketModule
  ],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule { }