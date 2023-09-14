import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  getUser(userId: string) {
    return this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  getUserByName(username: string) {
    return this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
  }

  createUser(username: string) {
    return this.prismaService.user.create({
      data: {
        username,
      },
    });
  }

  getUserChannels(userId: string) {
    return this.prismaService.channel.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
        subChannels: true,
      },
    });
  }
}
