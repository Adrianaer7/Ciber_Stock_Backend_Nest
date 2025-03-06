import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './web-socket.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true // Permite envío de cookies y autenticación
  }
})
export class SocketGateways implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  //le envia la señal al socket.on('connect', del front indicando que se conectó y ademas ejecuta el socket.on('clients-updated',   No puedo cambiar handleConnection por otro nombre por el OnGatewayConnection, lo mismo con el handleDisconnect del OnGatewayDisconnect
  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    //this.server.emit('clients-updated', this.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
    //this.server.emit('clients-updated', this.getConnectedClients());
  }

  afterInit() {
    this.socketService.setServer(this.server); // Asignamos el server al servicio
  }
  
  /* @SubscribeMessage('message-from-client')
  handleMessage(client: Socket, payload: { id: string, message: string }) {
    console.log(`Mensaje recibido de ${payload.id}: ${payload.message}`);
    this.server.emit('message-from-server', {
      fullName: client.id,
      message: payload.message
    });
  } */

  /* private getConnectedClients() {
    return Array.from(this.server.sockets.sockets.keys());
  } */

}