import { ApiProperty } from "@nestjs/swagger";

export class StoreDto {
  @ApiProperty() id!: string;
  @ApiProperty() ownerId!: string;
  @ApiProperty() name!: string;
  @ApiProperty() telefono!: string;
  @ApiProperty({ required: false }) email?: string | null;
  @ApiProperty({ required: false }) description?: string | null;
  @ApiProperty() direccion!: string;
  @ApiProperty() ciudad!: string;
  @ApiProperty() departamento!: string;
  @ApiProperty() pais!: string;
  @ApiProperty({ required: false }) codigoPostal?: string | null;
  @ApiProperty({ required: false }) referencia?: string | null;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;
}
