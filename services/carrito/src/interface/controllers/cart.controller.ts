import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { AddToCartUseCase } from '../../core/application/usecases/add-to-cart.usecase';
import { RemoveFromCartUseCase } from '../../core/application/usecases/remove-from-cart.usecase';
import { ViewCartUseCase } from '../../core/application/usecases/view-cart.usecase';
import { UpdateQuantityUseCase } from '../../core/application/usecases/update-quantity.usecase';
import { AddToCartDto } from '../../core/application/dto/add-to-cart.dto';
import { UpdateQuantityDto } from '../../core/application/dto/update-quantity.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly addUseCase: AddToCartUseCase,
    private readonly removeUseCase: RemoveFromCartUseCase,
    private readonly viewUseCase: ViewCartUseCase,
    private readonly updateUseCase: UpdateQuantityUseCase,
  ) {}

  @Post('add')
  @ApiOperation({ summary: 'Agregar ítem al carrito' })
  @ApiBody({ type: AddToCartDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Item agregado / carrito creado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  async add(@Body() dto: AddToCartDto) {
    // Retorna el carrito actualizado
    return this.addUseCase.execute(dto);
  }

  @Delete(':userId/item/:productId')
  @ApiOperation({ summary: 'Eliminar un producto del carrito' })
  @ApiParam({
    name: 'userId',
    description: 'ID del usuario',
    example: 'user-123',
  })
  @ApiParam({
    name: 'productId',
    description: 'ID del producto',
    example: 'product-456',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item eliminado y carrito actualizado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Carrito o item no encontrado',
  })
  async remove(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.removeUseCase.execute(userId, productId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Ver el carrito de un usuario' })
  @ApiParam({
    name: 'userId',
    description: 'ID del usuario',
    example: 'user-123',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Carrito encontrado' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Carrito no encontrado',
  })
  async view(@Param('userId') userId: string) {
    return this.viewUseCase.execute(userId);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Actualizar la cantidad de un producto en el carrito',
  })
  @ApiBody({ type: UpdateQuantityDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cantidad actualizada o item eliminado si quantity = 0',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  async update(@Body() dto: UpdateQuantityDto) {
    return this.updateUseCase.execute(dto);
  }
}
