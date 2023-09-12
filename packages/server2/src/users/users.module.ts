import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { ChannelModule } from '../channels/channel.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [ChannelModule, DbModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
