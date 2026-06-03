import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  matchId!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content!: string;
}