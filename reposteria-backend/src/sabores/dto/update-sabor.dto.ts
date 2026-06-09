import { PartialType } from '@nestjs/mapped-types';
import { CreateSaborDto } from './create-sabor.dto';

export class UpdateSaborDto extends PartialType(CreateSaborDto) {}