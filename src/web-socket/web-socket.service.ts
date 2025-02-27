import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
    private server: Server

    setServer(server: Server) {
        this.server = server
    }

    async emitirProductos() {
        if (!this.server) {
            console.warn('Servidor WebSocket no inicializado.');
            return;
        }
        this.server.emit('product-updated');
    }
}
