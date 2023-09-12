import { IsEnum, IsString } from 'class-validator';

enum SubChannelType {
  AUDIO_TEXT = 'AUDIO_TEXT',
  TEXT = 'TEXT',
}

export class CreateSubChannelDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(SubChannelType)
  type: SubChannelType;
}
