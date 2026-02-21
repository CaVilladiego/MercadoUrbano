export class RecommendationEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly sedes: any[], // [{ idSede, distancia }]
    public readonly promptUsed: string,
    public readonly createdAt: Date,
  ) {}
}
