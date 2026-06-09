import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateProductoDto {

  @IsString()
  nombre!: string;

  @IsString()
  descripcion!: string;

  @IsString()
  ingredientes!: string;

  @IsNumber()
  precio!: number;

  @IsString()
  imagen!: string;
  
  @IsOptional()
  @IsNumber()
  stock!: number | null;

  @IsBoolean()
  activo!: boolean;

  @IsString()
  tipo_venta!: string;

  @IsString()
  tipo!: string;

  // TORTA

  @IsOptional()
  @IsNumber()
  cantidad_pisos?: number;

  @IsOptional()
  @IsNumber()
  cantidad_personas?: number;

  @IsOptional()
  @IsString()
  forma_torta?: string;

  @IsOptional()
  @IsBoolean()
  permite_personalizacion_imagen?: boolean;

  // CUPCAKE

  @IsOptional()
  @IsBoolean()
  permite_color_crema?: boolean;

  // GALLETA

  @IsOptional()
  @IsString()
  sabor_galleta?: string;

  // QUEQUE

  @IsOptional()
  @IsString()
  sabor_queque?: string;
}