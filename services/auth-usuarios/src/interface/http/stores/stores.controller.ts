import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ForbiddenException,
  Req,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateStoreUseCase } from "@app/stores/usecases/create-store.usecase";
import { ListStoresByOwnerUseCase } from "@app/stores/usecases/list-stores-by-owner.usecase";
import { UpdateStoreUseCase } from "@app/stores/usecases/update-store.usecase";
import { DeleteStoreUseCase } from "@app/stores/usecases/delete-store.usecase";
import { CreateStoreDto } from "@app/stores/dto/create-store.dto";
import { UpdateStoreDto } from "@app/stores/dto/update-store.dto";
import { ListStoresUseCase } from "@app/stores/usecases/list-stores.usecase";
import { Roles } from "@infra/security/roles/roles.decorator";
import { Request } from "express-serve-static-core";

@ApiTags("3️⃣ Sedes")
@ApiBearerAuth()
@Controller("users/:ownerId/stores")
export class StoresController {
  constructor(
    private readonly listByOwner: ListStoresByOwnerUseCase,
    private readonly createStore: CreateStoreUseCase,
    private readonly updateStore: UpdateStoreUseCase,
    private readonly deleteStore: DeleteStoreUseCase,
    private readonly listStoresUseCase: ListStoresUseCase
  ) {}

  @Get("/all")
  @Roles("Administrador")
  @ApiOperation({ summary: "Listar todas las sedes (solo Admin)" })
  async listAll() {
    return this.listStoresUseCase.execute();
  }

  @Get()
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Listar las sedes de un vendedor" })
  list(@Param("ownerId") ownerId: string, @Req() req: Request) {
    const requester = req.user;

    if (requester?.Rol !== "Administrador" && requester?.id !== ownerId) {
      throw new ForbiddenException("No puedes ver sedes de otro vendedor");
    }

    return this.listByOwner.execute(ownerId);
  }

  @Post()
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Crear una sede para el vendedor autenticado" })
  create(
    @Param("ownerId") ownerId: string,
    @Body() body: CreateStoreDto,
    @Req() req: Request
  ) {
    const requester = req.user;

    if (requester?.Rol !== "Administrador" && requester?.id !== ownerId) {
      throw new ForbiddenException(
        "No puedes crear sedes para otro usuario"
      );
    }

    return this.createStore.execute(ownerId, body);
  }

  @Patch(":storeId")
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Actualizar una sede" })
  update(
    @Param("ownerId") ownerId: string,
    @Param("storeId") id: string,
    @Body() body: UpdateStoreDto,
    @Req() req: Request
  ) {
    const requester = req.user;

    if (requester?.Rol !== "Administrador" && requester?.id !== ownerId) {
      throw new ForbiddenException(
        "No puedes editar sedes de otro vendedor"
      );
    }

    return this.updateStore.execute(id, body);
  }

  @Delete(":storeId")
  @Roles("Administrador", "Vendedor")
  @ApiOperation({ summary: "Eliminar una sede" })
  remove(
    @Param("ownerId") ownerId: string,
    @Param("storeId") id: string,
    @Req() req: Request
  ) {
    const requester = req.user;

    if (requester?.Rol !== "Administrador" && requester?.id !== ownerId) {
      throw new ForbiddenException(
        "No puedes eliminar sedes de otro vendedor"
      );
    }

    return this.deleteStore.execute(id);
  }
}
