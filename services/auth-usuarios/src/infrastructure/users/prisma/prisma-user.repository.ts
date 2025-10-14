import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { UserEntity } from '@domain/users/user.entity';
import { PrismaService } from '@infra/users/prisma/prisma.service';
import { BcryptHasher } from '@infra/security/bcrypt/bcrypt.hasher';

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptHasher,
  ) {}

  async create(data: {
    email: string; passwordHash: string;
    PrimerNombre: string; SegundoNombre?: string;
    Apellido: string; Telefono: string;
    Rol?: 'Cliente' | 'Vendedor' | 'Administrador';
    Direccion: string; Ciudad: string; Departamento: string; Pais: string;
    CodigoPostal?: string; Referencia?: string;
    Tiendas?: Array<{ name: string; telefono: string; description?: string; email?: string; }>;
  }): Promise<UserEntity> {
    const u = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        PrimerNombre: data.PrimerNombre,
        SegundoNombre: data.SegundoNombre,
        Apellido: data.Apellido,
        Telefono: data.Telefono,
        Rol: data.Rol ?? 'Cliente',
        addresses: {
          create: [{
            Direccion: data.Direccion,
            Ciudad: data.Ciudad,
            Departamento: data.Departamento,
            Pais: data.Pais,
            CodigoPostal: data.CodigoPostal,
            Referencia: data.Referencia,
            isPrimary: true,
          }],
        },
        ...(data.Rol === 'Vendedor' && data.Tiendas?.length
          ? {
              Tiendas: {
                create: data.Tiendas.map(s => ({
                  name: s.name,
                  telefono: s.telefono,
                  description: s.description,
                  email: s.email,
                })),
              },
            }
          : {}),
      },
    });

    return new UserEntity(
      u.id, u.email, u.passwordHash,
      u.PrimerNombre, u.SegundoNombre, u.Apellido, u.Telefono, u.Rol,
      u.isActive, u.createdAt, u.updatedAt,
      '', ''
    );
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const u = await this.prisma.user.findUnique({ where: { email } });
    return u
      ? new UserEntity(
          u.id, u.email, u.passwordHash,
          u.PrimerNombre, u.SegundoNombre, u.Apellido, u.Telefono, u.Rol,
          u.isActive, u.createdAt, u.updatedAt,
          '', ''
        )
      : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const u = await this.prisma.user.findUnique({
      where: { id },
      include: {
        addresses: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    });

    if (!u) return null;

    const address = u.addresses[0];
    return new UserEntity(
      u.id, u.email, u.passwordHash,
      u.PrimerNombre, u.SegundoNombre, u.Apellido, u.Telefono, u.Rol,
      u.isActive, u.createdAt, u.updatedAt,
      address?.Direccion ?? '',
      address?.Ciudad ?? ''
    );
  }

  async list(): Promise<UserEntity[]> {
    const arr = await this.prisma.user.findMany({
      include: {
        addresses: {
          where: { isPrimary: true },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return arr.map(u => {
      const address = u.addresses[0];
      return new UserEntity(
        u.id, u.email, u.passwordHash,
        u.PrimerNombre, u.SegundoNombre, u.Apellido, u.Telefono, u.Rol,
        u.isActive, u.createdAt, u.updatedAt,
        address?.Direccion ?? '',
        address?.Ciudad ?? ''
      );
    });
  }

  async update(
    id: string,
    data: Partial<Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'> & { password?: string }>
  ): Promise<UserEntity> {
    const { password, ...rest } = data as any;
    const updateData: any = { ...rest };

    // manejar password -> passwordHash
    if (password) {
      updateData.passwordHash = await this.bcrypt.hash(password);
    }

    // manejar dirección si viene como campos planos
    if ((rest as any).Direccion) {
      updateData.addresses = {
        create: [{
          Direccion: (rest as any).Direccion,
          Ciudad: (rest as any).Ciudad,
          Departamento: (rest as any).Departamento,
          Pais: (rest as any).Pais,
          CodigoPostal: (rest as any).CodigoPostal,
          Referencia: (rest as any).Referencia,
          isPrimary: true,
        }],
      };
      delete updateData.Direccion;
      delete updateData.Ciudad;
      delete updateData.Departamento;
      delete updateData.Pais;
      delete updateData.CodigoPostal;
      delete updateData.Referencia;
    }

    // manejar Tiendas si vienen
    if ((rest as any).Tiendas) {
      updateData.Tiendas = {
        create: (rest as any).Tiendas.map((t: any) => ({
          name: t.name,
          telefono: t.telefono,
          description: t.description,
          email: t.email,
        })),
      };
      delete updateData.Tiendas;
    }

    const u = await this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        addresses: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    });

    const address = u.addresses[0];
    return new UserEntity(
      u.id, u.email, u.passwordHash,
      u.PrimerNombre, u.SegundoNombre, u.Apellido, u.Telefono, u.Rol,
      u.isActive, u.createdAt, u.updatedAt,
      address?.Direccion ?? '',
      address?.Ciudad ?? ''
    );
  }

  async delete(id: string): Promise<UserEntity> {
    // eliminar direcciones en cascada para evitar error de foreign key
    await this.prisma.address.deleteMany({ where: { userId: id } });
    await this.prisma.store.deleteMany({ where: { ownerId: id } });

    const u = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(
      u.id, u.email, u.passwordHash,
      u.PrimerNombre, u.SegundoNombre, u.Apellido, u.Telefono, u.Rol,
      u.isActive, u.createdAt, u.updatedAt,
      '', ''
    );
  }

  async search(term: string): Promise<UserEntity[]> {
    const arr = await this.prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: term, mode: 'insensitive' } },
          { PrimerNombre: { contains: term, mode: 'insensitive' } },
          { SegundoNombre: { contains: term, mode: 'insensitive' } },
          { Apellido: { contains: term, mode: 'insensitive' } },
          { Telefono: { contains: term, mode: 'insensitive' } },
        ],
      },
      include: {
        addresses: {
          where: { isPrimary: true },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return arr.map(u => {
      const address = u.addresses[0];
      return new UserEntity(
        u.id, u.email, u.passwordHash,
        u.PrimerNombre, u.SegundoNombre, u.Apellido, u.Telefono, u.Rol,
        u.isActive, u.createdAt, u.updatedAt,
        address?.Direccion ?? '',
        address?.Ciudad ?? ''
      );
    });
  }
}
