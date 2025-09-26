export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,

    public readonly PrimerNombre: string,
    public readonly SegundoNombre: string | null,
    public readonly Apellido: string,

    public readonly Telefono: string,
    public readonly Rol: 'Cliente' | 'Vendedor' | 'Administrador',

    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
