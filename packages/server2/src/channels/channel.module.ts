import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { DbModule } from '../db/db.module';
import { ChannelController } from './channel.controller';

@Module({
  imports: [DbModule],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
