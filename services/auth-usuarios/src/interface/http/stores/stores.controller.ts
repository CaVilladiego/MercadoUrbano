import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStoreUseCase } from '@app/stores/usecases/create-store.usecase';
import { ListStoresByOwnerUseCase } from '@app/stores/usecases/list-stores-by-owner.usecase';
import { UpdateStoreUseCase } from '@app/stores/usecases/update-store.usecase';
import { DeleteStoreUseCase } from '@app/stores/usecases/delete-store.usecase';
import { CreateStoreDto } from '@app/stores/dto/create-store.dto';
import { UpdateStoreDto } from '@app/stores/dto/update-store.dto';

@ApiTags('3️⃣ Sedes')
@ApiBearerAuth()
@Controller('users/:ownerId/stores')
export class StoresController {
  constructor(
    private readonly listByOwner: ListStoresByOwnerUseCase,
    private readonly createStore: CreateStoreUseCase,
    private readonly updateStore: UpdateStoreUseCase,
    private readonly deleteStore: DeleteStoreUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar sedes de un vendedor' })
  list(@Param('ownerId') ownerId: string) {
    return this.listByOwner.execute(ownerId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una sede para el vendedor' })
  create(@Param('ownerId') ownerId: string, @Body() body: CreateStoreDto) {
    return this.createStore.execute(ownerId, body);
  }

  @Patch(':storeId')
  @ApiOperation({ summary: 'Actualizar una sede' })
  update(@Param('storeId') id: string, @Body() body: UpdateStoreDto) {
    return this.updateStore.execute(id, body);
  }

  @Delete(':storeId')
  @ApiOperation({ summary: 'Eliminar una sede' })
  remove(@Param('storeId') id: string) {
    return this.deleteStore.execute(id);
  }
}
