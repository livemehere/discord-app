import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { PaginationQuery } from '../decoratoers/pagination.query';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Post()
  createChat(@Body() body: CreateChatDto) {
    return this.chatsService.createChat(body);
  }

  @Get(':subChannelId')
  getChats(
    @Param('subChannelId') subChannelId: string,
    @Query() query: PaginationQuery,
  ) {
    const { lastId, size, sort } = query;

    return this.chatsService.getChats(subChannelId, +size, sort, lastId);
  }
}
