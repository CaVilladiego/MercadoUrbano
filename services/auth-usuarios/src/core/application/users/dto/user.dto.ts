import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty() id!: string;
  @ApiProperty() email!: string;
  @ApiProperty() PrimerNombre!: string;
  @ApiProperty({ required: false }) SegundoNombre?: string;
  @ApiProperty() Apellido!: string;
  @ApiProperty() Telefono!: string;
  @ApiProperty({ enum: ['Cliente', 'Vendedor', 'Administrador'] }) Rol!: 'Cliente' | 'Vendedor' | 'Administrador';
  @ApiProperty() isActive!: boolean;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;
}
