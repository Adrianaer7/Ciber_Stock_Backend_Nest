import { Module } from '@nestjs/common';
import { SocketService } from './web-socket.service';
import { SocketGateways } from './web-socket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MapProvider } from './map.provider';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    AuthModule
  ],
  providers: [SocketGateways, SocketService, MapProvider],
  exports: [SocketService]
})
export class WebSocketModule { }
