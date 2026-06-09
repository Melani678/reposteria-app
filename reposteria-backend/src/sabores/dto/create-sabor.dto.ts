import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSaborDto {

  @IsString()
  @IsNotEmpty()
  nombre!: string;
}