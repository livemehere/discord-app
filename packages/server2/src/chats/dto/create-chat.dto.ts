import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  userId: string;

  @IsString()
  body: string;

  @IsString()
  subChannelId: string;
}
