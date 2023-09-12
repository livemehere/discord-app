import { IsOptional, IsString } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  channelImageUrl: string;

  @IsString()
  moderatorId: string;
}
