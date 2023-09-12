import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [UsersModule, DbModule, ChatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
