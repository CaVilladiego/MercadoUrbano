/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  ForbiddenException,
  Req,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOkResponse,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateProductDto } from "../../core/application/dto/create-product.dto";
import { ProductDto } from "../../core/application/dto/list-products.dto";
import { CreateProductUseCase } from "../../core/application/usecases/create-product.usecase";
import { GetProductUseCase } from "../../core/application/usecases/get-product.usecase";
import { ListProductsUseCase } from "../../core/application/usecases/list-products.usecase";
import { Product } from "src/core/domain/entities/product.entity";

import { Roles } from "../../infrastructure/security/roles/roles.decorator";
import type { Request } from "express-serve-static-core";

function toProductDto(product: Product): ProductDto {
  return {
    id_producto: product.id_producto,
    id_vendedor: product.id_vendedor,
    nombre: product.nombre,
    descripcion: product.descripcion,
    precio: product.precio,
    stock: product.stock,
    estado: product.estado,
  };
}

@ApiTags("Products")
@ApiBearerAuth()
@Controller("products")
export class ProductsController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getProductUseCase: GetProductUseCase,
    private listProductsUseCase: ListProductsUseCase,
  ) {}
  // Crear producto
  @Post()
  @Roles("Administrador", "Vendedor")
  @ApiOkResponse({ type: ProductDto })
  async create(
    @Body() dto: CreateProductDto,
    @Req() req: Request,
  ): Promise<ProductDto> {
    const requester = req.user as any;

    // Solo Admin o Vendedor
    if (requester.Rol !== "Administrador" && requester.Rol !== "Vendedor") {
      throw new ForbiddenException("No tienes permisos para crear productos");
    }

    // Vendedor → solo puede crear productos para sí mismo
    if (requester.Rol === "Vendedor" && dto.id_vendedor !== requester.id) {
      throw new ForbiddenException(
        "No puedes crear productos para otro vendedor",
      );
    }

    const product = await this.createProductUseCase.execute(dto);
    return toProductDto(product);
  }
  // Ver un producto (público)

  @Get(":id")
  @ApiOkResponse({ type: ProductDto })
  async findOne(@Param("id") id: string): Promise<ProductDto> {
    const product = await this.getProductUseCase.execute(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return toProductDto(product);
  }

  // Listar productos (público)

  @Get()
  @ApiOkResponse({ type: ProductDto, isArray: true })
  async findAll(): Promise<ProductDto[]> {
    const products = await this.listProductsUseCase.execute();
    return products.map(toProductDto);
  }
}
