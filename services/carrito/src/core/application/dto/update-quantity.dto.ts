import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsString } from 'class-validator';

export class UpdateQuantityDto {
  @ApiProperty({
    description: 'ID del usuario (en producción: tomar del JWT, no del body)',
    example: 'user-123',
  })
  @IsString()
  userId!: string;

  @ApiProperty({
    description: 'ID del producto dentro del carrito',
    example: 'product-456',
  })
  @IsString()
  productId!: string;

  @ApiProperty({
    description: 'Nueva cantidad (0 = eliminar)',
    example: 3,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  quantity!: number;
}
