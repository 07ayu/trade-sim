import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class GatewayGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private jwtService: JwtService) {}

  @SubscribeMessage('ping')
  handlePing(client: Socket, payload: any) {
    console.log('ping received', payload);
    client.emit('pong', 'pong');
  }

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('server initialized');
  }
  handleConnection(client: Socket) {
    try {
      console.log(`Connection attempt from client: ${client.id}`);
      //get the cookie from the handshake
      const bCookie = client.handshake.headers.cookie;
      if (!bCookie) {
        console.warn(
          `[Gateway] No cookie found in handshake for client: ${client.id}`,
        );
        client.disconnect();
        return;
      }
      //extract the token from the cookie
      const token = bCookie.split('user_token=')[1]?.split(';')[0];
      if (!token) {
        console.warn(
          `[Gateway] No user_token found in cookie for client: ${client.id}`,
        );
        client.disconnect();
        return;
      }

      //decode the token and get the user id
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;

      //join a private room fo this user
      client.join(`user_${userId}`);
      console.log(
        `[Gateway] User ${userId} successfully connected and joined room user_${userId}`,
      );
    } catch (error) {
      console.error('[Gateway] Connection error:', error.message);
      client.disconnect();
    }

    // console.log(`client connected ${client}`);
  }

  sendOrderUpdates(userId: string, order: any) {
    this.server.to(`user_${userId}`).emit('order_status_update', order);
    console.log('order status updated', order);
  }

  handleDisconnect(client: Socket) {
    console.log(`client has been disconnected ${client}`);
  }
}
