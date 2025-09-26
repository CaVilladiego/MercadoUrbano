export class StoreEntity {
  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly name: string,
    public readonly telefono: string,
    public readonly description: string | null,
    public readonly email: string | null,
    public readonly direccion: string,
    public readonly ciudad: string,
    public readonly departamento: string,
    public readonly pais: string,
    public readonly codigoPostal: string | null,
    public readonly referencia: string | null,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
