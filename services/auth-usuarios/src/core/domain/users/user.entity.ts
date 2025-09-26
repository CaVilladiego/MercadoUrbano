export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly fullName: string,
    public readonly role: 'USER' | 'ADMIN' | 'VENDOR',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
