import { Module } from '@nestjs/common';
import { SocketService } from './web-socket.service';
import { SocketGateways } from './web-socket.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SocketGateways, SocketService],
  exports: [SocketService]
})
export class WebSocketModule {}
