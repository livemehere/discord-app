import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { CreateSubChannelDto } from './dto/create-subChannel.dto';

@Injectable()
export class ChannelService {
  constructor(private prismaService: PrismaService) {}

  createChannel(data: CreateChannelDto) {
    return this.prismaService.channel.create({
      data: {
        ...data,
        members: {
          create: [
            {
              userId: data.moderatorId,
            },
          ],
        },
        subChannels: {
          create: [
            {
              name: '기본채널',
              type: 'TEXT',
            },
          ],
        },
      },
      include: {
        members: true,
        subChannels: true,
      },
    });
  }

  createSubChannel(data: CreateSubChannelDto & { channelId: string }) {
    return this.prismaService.subChannel.create({
      data,
    });
  }

  join(channelId: string, userId: string) {
    return this.prismaService.usersChannels.create({
      data: {
        userId,
        channelId,
      },
    });
  }

  leave(channelId: string, userId: string) {
    return this.prismaService.usersChannels.deleteMany({
      where: {
        userId,
        channelId,
      },
    });
  }

  search(q: string) {
    return this.prismaService.channel.findMany({
      where: {
        name: { contains: q },
      },
    });
  }
}
