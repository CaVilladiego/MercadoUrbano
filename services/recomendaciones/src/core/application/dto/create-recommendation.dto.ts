import { ApiProperty } from '@nestjs/swagger';

export class CreateRecommendationDto {
  @ApiProperty({
    example: 'user-123',
    description: 'ID del usuario que recibe la recomendación',
  })
  userId: string;

  @ApiProperty({
    example: [{ idSede: 'sede-1', distancia: '3.5km' }],
    description: 'Lista de sedes recomendadas con distancia',
  })
  sedes: any; // [{ idSede, distancia }]

  @ApiProperty({
    example: 'Prompt usado para generar la recomendación con Gemini',
    description: 'Texto del prompt utilizado',
  })
  promptUsed: string;
}
