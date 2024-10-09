import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { WebSocket, WebSocketServer } from 'ws';

@WebSocketGateway() // Decorate with the WebSocketGateway
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('EventsGateway');
  private socketServer = new WebSocketServer({ port: 8080 });

  constructor() {
    this.socketServer.on('connection', (ws) => this.handleConnection(ws));
  }

  handleConnection(client: WebSocket) {
    this.logger.log('New client connected!');
    client.send('Connection established');
    client.on('close', () => {
      this.logger.log('Client has disconnected!');
    });

    client.on('message', (data: string) => {
      this.logger.log(`Received message: ${data}`);
      this.broadcastMessage(data);
    });
  }

  private broadcastMessage(data: string) {
    this.socketServer.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  }

  // Handle disconnection event
  handleDisconnect() {
    this.logger.log('Client has disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, data: string): void {
    console.log(data.toString());
    client.send(data.toString()); // You can customize how to handle messages here
  }
}
