import { RecommendationRepository } from '../../domain/repositories/recommendation.repository';
import { GeminiService } from '../../../infrastructure/ai/gemini.service';

export class GetRecommendationsUseCase {
  constructor(
    private readonly recommendationRepo: RecommendationRepository,
    private readonly geminiService: GeminiService,
  ) {}

  async execute(userId: string, userLocation: any, sedes: any[]) {
    // Prompt enfocado solo en sedes
    const prompt = `
El usuario está en la siguiente dirección: 
${userLocation.direccion}, ${userLocation.ciudad}, ${userLocation.pais}.

Calcula a cuántos kilómetros está su dirección de cada una de estas sedes y estima el tiempo aproximado de llegada en carro o transporte normal. 
Recomiéndale únicamente las sedes más cercanas:

${sedes.map((s) => `- ${s.direccion}, ${s.ciudad}`).join('\n')}
`;

    const recomendacionIA = await this.geminiService.generateText(prompt);

    const recommendation = await this.recommendationRepo.createRecommendation({
      userId,
      sedes,
      promptUsed: prompt,
    });

    return {
      recommendation,
      recomendacionIA,
    };
  }
}
