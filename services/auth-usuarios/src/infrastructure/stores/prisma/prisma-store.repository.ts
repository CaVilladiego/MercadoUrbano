import { Injectable } from '@nestjs/common';
import { StoreRepositoryPort } from '@domain/stores/store.repository.port';
import { StoreEntity } from '@domain/stores/store.entity';
import { PrismaService } from '@infra/users/prisma/prisma.service';

@Injectable()
export class PrismaStoreRepository implements StoreRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    ownerId: string;
    name: string;
    telefono: string;
    email?: string;
    description?: string;
    direccion: string;
    ciudad: string;
    departamento: string;
    pais: string;
    codigoPostal?: string;
    referencia?: string;
  }): Promise<StoreEntity> {
    const s = await this.prisma.store.create({
      data: {
        ownerId: data.ownerId,
        name: data.name,
        telefono: data.telefono,
        email: data.email,
        description: data.description,
        direccion: data.direccion,
        ciudad: data.ciudad,
        departamento: data.departamento,
        pais: data.pais,
        codigoPostal: data.codigoPostal,
        referencia: data.referencia,
      },
    });

    return new StoreEntity(
      s.id,
      s.ownerId,
      s.name,
      s.telefono,
      s.description,
      s.email,
      s.direccion,
      s.ciudad,
      s.departamento,
      s.pais,
      s.codigoPostal,
      s.referencia,
      s.isActive,
      s.createdAt,
      s.updatedAt
    );
  }

  async findById(id: string): Promise<StoreEntity | null> {
    const s = await this.prisma.store.findUnique({ where: { id } });
    return s
      ? new StoreEntity(
          s.id,
          s.ownerId,
          s.name,
          s.telefono,
          s.description,
          s.email,
          s.direccion,
          s.ciudad,
          s.departamento,
          s.pais,
          s.codigoPostal,
          s.referencia,
          s.isActive,
          s.createdAt,
          s.updatedAt
        )
      : null;
  }

  async findByOwner(ownerId: string): Promise<StoreEntity[]> {
    const arr = await this.prisma.store.findMany({ where: { ownerId } });
    return arr.map(
      s =>
        new StoreEntity(
          s.id,
          s.ownerId,
          s.name,
          s.telefono,
          s.description,
          s.email,
          s.direccion,
          s.ciudad,
          s.departamento,
          s.pais,
          s.codigoPostal,
          s.referencia,
          s.isActive,
          s.createdAt,
          s.updatedAt
        )
    );
  }

  async list(): Promise<StoreEntity[]> {
    const arr = await this.prisma.store.findMany({ orderBy: { createdAt: 'desc' } });
    return arr.map(
      s =>
        new StoreEntity(
          s.id,
          s.ownerId,
          s.name,
          s.telefono,
          s.description,
          s.email,
          s.direccion,
          s.ciudad,
          s.departamento,
          s.pais,
          s.codigoPostal,
          s.referencia,
          s.isActive,
          s.createdAt,
          s.updatedAt
        )
    );
  }

  async update(
    id: string,
    data: Partial<Omit<StoreEntity, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<StoreEntity> {
    const s = await this.prisma.store.update({ where: { id }, data });
    return new StoreEntity(
      s.id,
      s.ownerId,
      s.name,
      s.telefono,
      s.description,
      s.email,
      s.direccion,
      s.ciudad,
      s.departamento,
      s.pais,
      s.codigoPostal,
      s.referencia,
      s.isActive,
      s.createdAt,
      s.updatedAt
    );
  }

  async delete(id: string): Promise<StoreEntity> {
    const s = await this.prisma.store.delete({ where: { id } });
    return new StoreEntity(
      s.id,
      s.ownerId,
      s.name,
      s.telefono,
      s.description,
      s.email,
      s.direccion,
      s.ciudad,
      s.departamento,
      s.pais,
      s.codigoPostal,
      s.referencia,
      s.isActive,
      s.createdAt,
      s.updatedAt
    );
  }
}
