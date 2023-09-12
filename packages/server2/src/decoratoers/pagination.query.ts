import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

enum Sort {
  DESC = 'desc',
  ASC = 'asc',
}

export class PaginationQuery {
  @IsString()
  @IsOptional()
  lastId: string;

  @IsNumberString()
  size: number;

  @IsEnum(Sort)
  sort: Sort;
}
