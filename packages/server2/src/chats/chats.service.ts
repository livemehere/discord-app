import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(private prismaService: PrismaService) {}

  createChat(data: CreateChatDto) {
    return this.prismaService.chat.create({
      data,
    });
  }

  getChats(
    subChannelId: string,
    size: number,
    sort: string,
    lastChatId?: string,
  ) {
    return this.prismaService.chat.findMany({
      where: {
        subChannelId,
      },
      take: size,
      skip: lastChatId ? 1 : 0,
      ...(lastChatId && {
        cursor: {
          id: lastChatId,
        },
      }),
      orderBy: {
        createdAt: sort as any,
      },
    });
  }
}
