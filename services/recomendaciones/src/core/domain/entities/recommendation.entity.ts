export class Recommendation {
  constructor(
    public id: string,
    public userId: string,
    public sedes: any,
    public promptUsed: string,
    public createdAt: Date,
  ) {}
}
