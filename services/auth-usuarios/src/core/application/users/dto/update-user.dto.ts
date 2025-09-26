import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  PrimerNombre?: string;

  @ApiPropertyOptional()
  SegundoNombre?: string;

  @ApiPropertyOptional()
  Apellido?: string;

  @ApiPropertyOptional()
  Telefono?: string;

  @ApiPropertyOptional()
  Direccion?: string;

  @ApiPropertyOptional()
  Ciudad?: string;

  @ApiPropertyOptional()
  Departamento?: string;

  @ApiPropertyOptional()
  Pais?: string;

  @ApiPropertyOptional()
  CodigoPostal?: string;

  @ApiPropertyOptional()
  Referencia?: string;

  @ApiPropertyOptional({ enum: ['Cliente', 'Vendedor', 'Administrador'] })
  Rol?: 'Cliente' | 'Vendedor' | 'Administrador';

  @ApiPropertyOptional()
  isActive?: boolean;
}
