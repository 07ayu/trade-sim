import { JwtService } from '@nestjs/jwt';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
})
export class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private jwtService: JwtService){}


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
    //get the cookie from the handshake
        const bCookie = client.handshake.headers.cookie
        if(!bCookie) {
            console.log('no cookie');
            client.disconnect();
            return;
        }
    //extract the token from the cookie
        const token = bCookie.split('user_token=')[1]?.split(';')[0]   
        if(!token){
            console.log('no token');
            client.disconnect();
            return;
        }
        
        //decode the token and get the user id
        const payload = this.jwtService.verify(token);
        const userId =payload.sub
        console.log(userId)

        //join a private room fo this user
        client.join(`user_${userId}`)
        console.log(`User ${userId} successfully connected and joined room user_${userId}`);
    }catch(error){
        console.log('error in connection',error);
        client.disconnect();
    }

    // console.log(`client connected ${client}`);
    }


    sendOrderUpdates(userId:string,order: any) {
        this.server.to(`user_${userId}`).emit('order_status_update', order);
        console.log('order status updated', order);
    }


    handleDisconnect(client: Socket) {
        console.log(`client has been disconnected ${client}`);
    }
}