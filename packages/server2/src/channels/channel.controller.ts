import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { CreateSubChannelDto } from './dto/create-subChannel.dto';

@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  async createChannel(@Body() body: CreateChannelDto) {
    try {
      return this.channelService.createChannel(body);
    } catch (e) {
      return e;
    }
  }

  @Get()
  async search(@Query('q') q: string) {
    return this.channelService.search(q);
  }

  @Post(':channelId/subChannels')
  async createSubChannel(
    @Body() body: CreateSubChannelDto,
    @Param('channelId') channelId: string,
  ) {
    try {
      return this.channelService.createSubChannel({ ...body, channelId });
    } catch (e) {
      return e;
    }
  }

  @Post(':channelId/join')
  async joinChannel(
    @Param('channelId') channelId: string,
    @Body('userId') userId: string,
  ) {
    return this.channelService.join(channelId, userId);
  }

  @Post(':channelId/leave')
  async leaveChannel(
    @Param('channelId') channelId: string,
    @Body('userId') userId: string,
  ) {
    return this.channelService.leave(channelId, userId);
  }
}
