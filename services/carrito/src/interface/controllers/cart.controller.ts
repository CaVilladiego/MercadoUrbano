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
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AddToCartUseCase } from '../../core/application/usecases/add-to-cart.usecase';
import { RemoveFromCartUseCase } from '../../core/application/usecases/remove-from-cart.usecase';
import { ViewCartUseCase } from '../../core/application/usecases/view-cart.usecase';
import { UpdateQuantityUseCase } from '../../core/application/usecases/update-quantity.usecase';

import { AddToCartDto } from '../../core/application/dto/add-to-cart.dto';
import { UpdateQuantityDto } from '../../core/application/dto/update-quantity.dto';

import { Roles } from '../../infrastructure/security/roles/roles.decorator';
import { Request } from 'express-serve-static-core';

@ApiTags('cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(
    private readonly addUseCase: AddToCartUseCase,
    private readonly removeUseCase: RemoveFromCartUseCase,
    private readonly viewUseCase: ViewCartUseCase,
    private readonly updateUseCase: UpdateQuantityUseCase,
  ) {}

  // AGREGAR AL CARRITO
  @Post('add')
  @Roles('Cliente', 'Vendedor', 'Administrador')
  @ApiOperation({ summary: 'Agregar ítem al carrito' })
  async add(@Body() dto: AddToCartDto, @Req() req: Request) {
    const user = req.user as any;

    if (dto.userId !== user.id && user.role !== 'Administrador') {
      throw new ForbiddenException('No puedes modificar el carrito de otro usuario');
    }

    return this.addUseCase.execute(dto);
  }

  // VER CARRITO
  @Get(':userId')
  @Roles('Cliente', 'Vendedor', 'Administrador')
  @ApiOperation({ summary: 'Ver el carrito de un usuario' })
  async view(@Param('userId') userId: string, @Req() req: Request) {
    const user = req.user as any;

    if (user.id !== userId && user.role !== 'Administrador') {
      throw new ForbiddenException('No puedes ver el carrito de otro usuario');
    }

    return this.viewUseCase.execute(userId);
  }

  // ELIMINAR ITEM
  @Delete(':userId/item/:productId')
  @Roles('Cliente', 'Vendedor', 'Administrador')
  @ApiOperation({ summary: 'Eliminar ítem del carrito' })
  async remove(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const user = req.user as any;

    if (user.id !== userId && user.role !== 'Administrador') {
      throw new ForbiddenException('No puedes modificar el carrito de otro usuario');
    }

    return this.removeUseCase.execute(userId, productId);
  }
  // ACTUALIZAR CANTIDAD
  @Patch('update')
  @Roles('Cliente', 'Vendedor', 'Administrador')
  @ApiOperation({ summary: 'Actualizar cantidad' })
  async update(@Body() dto: UpdateQuantityDto, @Req() req: Request) {
    const user = req.user as any;

    if (dto.userId !== user.id && user.role !== 'Administrador') {
      throw new ForbiddenException('No puedes modificar el carrito de otro usuario');
    }

    return this.updateUseCase.execute(dto);
  }
}
