import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto.username);
      return user;
    } catch (e) {
      throw new BadRequestException(e.name);
    }
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`존재하지 않는 유저입니다(${userId})`);
    }
    return user;
  }

  @Get('username/:username')
  async getUserByName(@Param('username') username: string) {
    const user = await this.userService.getUserByName(username);
    if (!user) {
      throw new NotFoundException(`존재하지 않는 유저입니다(${username})`);
    }
    return user;
  }

  @Get(':userId/channels')
  async getUserChannels(@Param('userId') userId: string) {
    return this.userService.getUserChannels(userId);
  }
}
