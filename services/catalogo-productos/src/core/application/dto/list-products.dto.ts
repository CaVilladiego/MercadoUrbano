import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty({ description: "ID del producto" })
  id_producto: string;

  @ApiProperty({ description: "ID del vendedor" })
  id_vendedor: string;

  @ApiProperty({ description: "Nombre del producto" })
  nombre: string;

  @ApiProperty({ description: "Descripcion del producto" })
  descripcion: string;

  @ApiProperty({ description: "Precio del producto" })
  precio: number;

  @ApiProperty({ description: "Cantidad del producto en stock del vendedor" })
  stock: number;

  @ApiProperty({ description: "Estado del producto" })
  estado: boolean;
}
