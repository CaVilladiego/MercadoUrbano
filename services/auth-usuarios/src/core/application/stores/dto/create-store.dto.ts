import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ example: 'Tienda Principal' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '3001234567' })
  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @ApiProperty({ example: 'Venta de frutas y verduras', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'tienda@demo.com', required: false })
  @IsString()
  @IsOptional()
  email?: string;

  // Dirección
  @ApiProperty({ example: 'Calle 10 #20-30' })
  @IsString()
  @IsNotEmpty()
  direccion!: string;

  @ApiProperty({ example: 'Barranquilla' })
  @IsString()
  @IsNotEmpty()
  ciudad!: string;

  @ApiProperty({ example: 'Atlántico' })
  @IsString()
  @IsNotEmpty()
  departamento!: string;

  @ApiProperty({ example: 'Colombia' })
  @IsString()
  @IsNotEmpty()
  pais!: string;

  @ApiProperty({ example: '080001', required: false })
  @IsString()
  @IsOptional()
  codigoPostal?: string;

  @ApiProperty({ example: 'Frente al parque', required: false })
  @IsString()
  @IsOptional()
  referencia?: string;
}
