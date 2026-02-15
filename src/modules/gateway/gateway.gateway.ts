// import {
//   OnGatewayConnection,
//   SubscribeMessage,
//   WebSocketGateway,
// } from '@nestjs/websockets';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class GatewayGateway {
//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any): string {
//     console.log('gateway msg received');
//     return 'Hello world!';
//   }
//   handleConnection() {
//     console.log('client connected');
//   }

//   handleDisconnection() {
//     console.log('client has been disconnected');
//   }
// }
