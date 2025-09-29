import { ApiProperty } from '@nestjs/swagger';

export class RecommendationResponseDto {
  @ApiProperty({ description: 'ID de la recomendación' })
  id: string;

  @ApiProperty({
    description: 'ID del usuario al que pertenece la recomendación',
  })
  userId: string;

  @ApiProperty({
    description: 'Lista de sedes recomendadas',
    type: [Object],
  })
  sedes: { idsede: string; distancia: number }[];

  @ApiProperty({ description: 'Prompt usado para generar la recomendación' })
  promptUsed: string;

  @ApiProperty({ description: 'Fecha de creación de la recomendación' })
  createdAt: Date;
}
