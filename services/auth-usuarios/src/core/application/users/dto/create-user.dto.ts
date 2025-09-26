import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@prisma/client';

class StoreCreateDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  telefono!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  // Campos de ubicación opcionales (solo si Rol=Vendedor)
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ciudad?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  departamento?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pais?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  codigoPostal?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  referencia?: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty()
  @IsString()
  PrimerNombre!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  SegundoNombre?: string;

  @ApiProperty()
  @IsString()
  Apellido!: string;

  @ApiProperty()
  @IsString()
  Telefono!: string;

  @ApiProperty()
  @IsString()
  Direccion!: string;

  @ApiProperty()
  @IsString()
  Ciudad!: string;

  @ApiProperty()
  @IsString()
  Departamento!: string;

  @ApiProperty()
  @IsString()
  Pais!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  CodigoPostal?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Referencia?: string;

  @ApiPropertyOptional({ enum: Role, default: Role.Cliente })
  @IsOptional()
  @IsEnum(Role)
  Rol?: Role;

  @ApiPropertyOptional({ type: [StoreCreateDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoreCreateDto)
  Tiendas?: StoreCreateDto[];
}
