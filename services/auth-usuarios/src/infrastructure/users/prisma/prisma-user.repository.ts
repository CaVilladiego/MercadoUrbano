import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { UserEntity } from '@domain/users/user.entity';
import { PrismaService } from '@infra/users/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { email: string; passwordHash: string; fullName: string; role?: 'USER'|'ADMIN'|'VENDOR' }): Promise<UserEntity> {
    const u = await this.prisma.user.create({ data: { ...data, role: data.role ?? 'USER' }});
    return new UserEntity(u.id, u.email, u.passwordHash, u.fullName, u.role, u.createdAt, u.updatedAt);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const u = await this.prisma.user.findUnique({ where: { email } });
    return u ? new UserEntity(u.id, u.email, u.passwordHash, u.fullName, u.role, u.createdAt, u.updatedAt) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const u = await this.prisma.user.findUnique({ where: { id } });
    return u ? new UserEntity(u.id, u.email, u.passwordHash, u.fullName, u.role, u.createdAt, u.updatedAt) : null;
  }

  async list(): Promise<UserEntity[]> {
    const arr = await this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return arr.map(u => new UserEntity(u.id, u.email, u.passwordHash, u.fullName, u.role, u.createdAt, u.updatedAt));
  }
}
