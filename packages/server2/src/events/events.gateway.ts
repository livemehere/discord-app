import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateChatDto } from '../chats/dto/create-chat.dto';
import { PrismaService } from '../db/prisma.service';
import { SocketService } from '../socket/socket.service';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class EventGateWay
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private prismaService: PrismaService,
    private socketService: SocketService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.socketService.server = server;
  }

  handleConnection(client: Socket) {
    console.log('cookie:', client.request.headers.cookie);
    const userId = client.handshake.auth.token;
    const socketId = client.id;
    console.log(`userId:${userId}(socketId:${socketId}) connected`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.token;
    const socketId = client.id;
    console.log(`userId:${userId}(socketId:${socketId}) disconnected`);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, rooms: string | string[]) {
    client.join(rooms);
    console.log(`${client.id} join rooms : `, client.rooms);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, room: string) {
    client.leave(room);
    console.log(`${client.id} leave room : `, client.rooms);
  }

  @SubscribeMessage('getRooms')
  handleGetRooms(client: Socket) {
    console.log(`${client.id} getRooms : `, client.rooms);
  }

  @SubscribeMessage('chat')
  async sendChat(client: Socket, data: CreateChatDto) {
    const userId = client.handshake.auth.token;
    const chat = await this.prismaService.chat.create({
      data: {
        body: data.body,
        userId,
        subChannelId: data.subChannelId,
      },
    });
    console.log(`chat:`, chat);
    this.server.to(data.subChannelId).emit('chat', chat);
  }

  // @SubscribeMessage('onlineMembers')
  // getOnlineMembers(client: Socket, channelId: string) {
  //   const onlineMembers = this.server.sockets;
  //   console.log(onlineMembers.sockets.size);
  //   this.server.emit(`${client.id}-onlineMembers:response`, onlineMembers);
  // }
}
