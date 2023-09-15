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
import { isArray } from 'class-validator';

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
    this.sendOnlineMembers(rooms);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, room: string) {
    client.leave(room);
    console.log(`${client.id} leave room : `, client.rooms);
    this.sendOnlineMembers(room);
  }

  @SubscribeMessage('join:subChannel')
  handleJoinSubChannel(
    client: Socket,
    data: { channelId: string; subChannelId: string },
  ) {
    client.join(data.subChannelId);
    console.log(`${client.id} join subChannel room : `, client.rooms);
    this.sendOnlineMembers(data.channelId + '-channel');
  }

  @SubscribeMessage('leave:subChannel')
  handleLeaveSubChannel(
    client: Socket,
    data: { channelId: string; subChannelId: string },
  ) {
    client.leave(data.subChannelId);
    console.log(`${client.id} leave subChannel room : `, client.rooms);
    this.sendOnlineMembers(data.channelId + '-channel');
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
        channelId: data.channelId,
      },
    });
    console.log(`chat:`, chat);
    this.server.to(data.subChannelId).emit('chat', chat);
    this.server
      .to(data.channelId + '-channel')
      .emit('new-chat', data.subChannelId);
  }

  @SubscribeMessage('audio')
  async sendAudio(
    client: Socket,
    data: { subChannelId: string; userId: string; blob: Blob },
  ) {
    // 오디오는 본인 제외하고 보냄
    client.broadcast.to(data.subChannelId).emit('audio', data);
  }

  sendOnlineMembers(rooms: string | string[]) {
    const room = isArray(rooms) ? rooms[0] : rooms;
    console.log('@@@', room);
    this.server
      .in(room)
      .fetchSockets()
      .then((sockets) => {
        const onlineMembers = sockets.map((socket) => {
          return {
            userId: socket.handshake.auth.token,
            rooms: Array.from(socket.rooms),
          };
        });
        this.server.emit('online-members', onlineMembers);
      });
  }
}
