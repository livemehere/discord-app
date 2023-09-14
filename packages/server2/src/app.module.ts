import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ChatsModule } from './chats/chats.module';
import { EventsModule } from './events/events.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [UsersModule, DbModule, ChatsModule, EventsModule, SocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
