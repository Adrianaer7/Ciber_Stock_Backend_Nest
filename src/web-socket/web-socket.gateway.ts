import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './web-socket.service';
import { JwtPayload } from 'src/helpers/interfaces';
import { JwtService } from "@nestjs/jwt";
import { AuthService } from 'src/auth/auth.service';
import { environments } from 'src/environments/environment';
import { Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true // Permite envío de cookies y autenticación
  }
})
export class SocketGateways implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly jwtService: JwtService,
    private authService: AuthService,
    @Inject('ACTIVE_SESSIONS_MAP')   // Inyectar el proveedor - Mapa para almacenar sesiones activas
    private activeSessions: Map<string, { clientId: string; nombre: string }>
  ) { }

  //le envia la señal al socket.on('connect', del front indicando que se conectó. No puedo cambiar handleConnection por otro nombre por el OnGatewayConnection, lo mismo con el handleDisconnect del OnGatewayDisconnect
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication
    try {
      const usuario = await this.verifyToken(token);
      if(usuario) {
        if (this.activeSessions.has(usuario._id.toString())) {
          console.log(`El usuario ${usuario.nombre} va a ser desconectado por que ya tiene sesión activa`);
          client.disconnect(); // Ejecuta el handleDisconnect
          return;
        }
        this.activeSessions.set(usuario._id.toString(), {clientId: client.id, nombre: usuario.nombre});
        console.log(`Cliente conectado: ${usuario.nombre}`);
        //this.server.emit('clients-updated', this.getConnectedClients());
      } else {
        client.disconnect()
        return { redireccionar: true }
      }
    } catch (error) {
      client.disconnect()
      return { redireccionar: true }
    }
  }

  async handleDisconnect(client: Socket) {
    const token = client.handshake.headers.authentication;
    const usuario = await this.verifyToken(token);
    if(usuario) {
      this.activeSessions.delete(usuario._id.toString());
      console.log(`Cliente desconectado: ${usuario.nombre}`);
    }
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


  async verifyToken(token) {
    let payload: JwtPayload
    try {
      payload = await this.jwtService.verifyAsync(token, { secret: environments.SECRETA });
    } catch (error) {
      return false
    }

    //busco usuario segun id del token
    const usuario = await this.authService.findUserById(payload.id);
    if (!usuario) return false
    if (!usuario.confirmado) return false
    return usuario
  }

}