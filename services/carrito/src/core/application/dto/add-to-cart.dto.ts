import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    description: 'ID del usuario (en producción: tomar del JWT, no del body)',
    example: 'user-123',
  })
  @IsString()
  userId!: string;

  @ApiProperty({
    description: 'ID del producto (proveniente del microservicio de productos)',
    example: 'product-456',
  })
  @IsString()
  productId!: string;

  @ApiProperty({
    description: 'Cantidad a agregar',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  quantity!: number;
}
