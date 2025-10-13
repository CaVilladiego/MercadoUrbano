import { StoreEntity } from "@domain/stores/store.entity";
import { StoreDto } from "../dto/store.dto";

export class StoreMapper {
  static toDto(store: StoreEntity): StoreDto {
    const dto = new StoreDto();

    dto.id = store.id;
    dto.ownerId = store.ownerId;
    dto.name = store.name;
    dto.telefono = store.telefono;
    dto.email = store.email;
    dto.description = store.description;
    dto.direccion = store.direccion;
    dto.ciudad = store.ciudad;
    dto.departamento = store.departamento;
    dto.pais = store.pais;
    dto.codigoPostal = store.codigoPostal;
    dto.referencia = store.referencia;
    dto.isActive = store.isActive;
    dto.createdAt = store.createdAt;
    dto.updatedAt = store.updatedAt;

    return dto;
  }
}
