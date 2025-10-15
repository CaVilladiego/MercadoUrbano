import { Injectable, Inject } from '@nestjs/common';
import type { UsersApiPort } from '../../domain/repositories/users-api.port';
import type { GeminiPort } from '../../domain/repositories/gemini.port';
import type { RecommendationRepositoryPort } from '../../domain/repositories/recommendation.repository.port';
import { USERS_API, GEMINI_SERVICE, RECOMMENDATION_REPO } from '../tokens';

@Injectable()
export class RecommendNearbyStoresUseCase {
  constructor(
    @Inject(USERS_API) private readonly usersApi: UsersApiPort,
    @Inject(GEMINI_SERVICE) private readonly gemini: GeminiPort,
    @Inject(RECOMMENDATION_REPO)
    private readonly recommendations: RecommendationRepositoryPort,
  ) {}

  async execute(userId: string) {
    const user = await this.usersApi.getUserById(userId);
    const stores = await this.usersApi.listAllStores();

    const address =
      user.addresses?.find((a: any) => a.isPrimary) ||
      user.addresses?.[0] ||
      (user.Direccion
        ? {
            Direccion: user.Direccion,
            Ciudad: user.Ciudad,
            Departamento: user.Departamento ?? 'Sin especificar',
            Pais: user.Pais ?? 'Sin especificar',
          }
        : null);

    if (!address) throw new Error('El usuario no tiene dirección registrada.');

    const prompt = `
Eres un asistente que recomienda sedes según cercanía geográfica.

📍 Usuario:
- Nombre: ${user.PrimerNombre} ${user.Apellido}
- Ciudad: ${address.Ciudad}
- Dirección: ${address.Direccion}


🏢 Sedes disponibles:
${stores
  .map(
    (s: any) =>
      `- ${s.id}: ${s.name}, ${s.ciudad}, ${s.direccion}, ${s.departamento}, ${s.pais}`,
  )
  .join('\n')}

Devuelve un JSON con las sedes más cercanas al usuario, máximo 5, 
usando este formato:
[
  { "idSede": "uuid", "distancia": "X km" }
]
No incluyas texto fuera del JSON.
`;

    const text = await this.gemini.generateText(prompt);
    console.log('🔹 GEMINI RESPONSE:', text);

    const match = text.match(/\[.*\]/s);
    if (!match) throw new Error('Respuesta inválida de Gemini');

    const recommendations = JSON.parse(match[0]);

    return this.recommendations.create({
      userId,
      sedes: recommendations,
      promptUsed: prompt,
    });
  }
}
