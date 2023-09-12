import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { DbModule } from '../db/db.module';
import { ChatsController } from './chats.controller';

@Module({
  imports: [DbModule],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
