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
      console.log(`[Gateway] Connection attempt: ${client.id}`);

      const bCookie = client.handshake.headers.cookie;
      if (!bCookie) {
        console.warn(`[Gateway] No cookie found for client: ${client.id}`);
        this.SendErroAndDisconnect(client, 'Authentication cookie missing');
        return;
      }
      //extract the token from the cookie
      const token = bCookie.split('user_token=')[1]?.split(';')[0];
      if (!token) {
        console.warn(
          `[Gateway] No user_token in cookie for client: ${client.id}`,
        );
        this.SendErroAndDisconnect(client, 'Authentication token missing');
        return;
      }

      try {
        const payload = this.jwtService.verify(token);
        const userId = payload.sub;

        //join a private room fo this user
        client.join(`user_${userId}`);
        console.log(`[Gateway] User ${userId} connected (${client.id})`);
      } catch (jwtError) {
        const message =
          jwtError.name === 'TokenExpiredError'
            ? 'Token expired'
            : 'Invalid token';
        console.warn(`[Gateway] JWT Error for ${client.id}: ${message}`);
        this.SendErroAndDisconnect(client, message);
      }
    } catch (error) {
      console.error('[Gateway] Unexpected connection error:', error.message);
      client.disconnect();
    }
  }

  private SendErroAndDisconnect(client: Socket, message: String) {
    client.emit('error', { message });

    setTimeout(() => client.disconnect(), 100);
  }

  sendOrderUpdates(userId: string, order: any) {
    this.server.to(`user_${userId}`).emit('order_status_update', order);
    console.log('order status updated', order);
  }

  disconnectUser(userId: string) {
    this.server.to(`user_${userId}`).disconnectSockets(true);
    console.log(`[Gateway] Force disconnected sockets for user ${userId}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client has been disconnected ${client.id}`);
  }
}
