import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStoreDto {
  @ApiPropertyOptional({ example: 'Tienda Principal' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '3001234567' })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({ example: 'Venta de frutas y verduras' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'tienda@demo.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Calle 10 #20-30' })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiPropertyOptional({ example: 'Barranquilla' })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiPropertyOptional({ example: 'Atlántico' })
  @IsString()
  @IsOptional()
  departamento?: string;

  @ApiPropertyOptional({ example: 'Colombia' })
  @IsString()
  @IsOptional()
  pais?: string;

  @ApiPropertyOptional({ example: '080001' })
  @IsString()
  @IsOptional()
  codigoPostal?: string;

  @ApiPropertyOptional({ example: 'Frente al parque' })
  @IsString()
  @IsOptional()
  referencia?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isActive?: boolean;
}
