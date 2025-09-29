import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from '../../core/application/dto/create-product.dto'
import { ProductDto } from '../../core/application/dto/list-products.dto'
import { CreateProductUseCase } from '../../core/application/usecases/create-product.usecase';
import { GetProductUseCase } from '../../core/application/usecases/get-product.usecase';
import { ListProductsUseCase } from '../../core/application/usecases/list-products.usecase';
import { Product } from 'src/core/domain/entities/product.entity';

function toProductDto(product: Product): ProductDto {
  return {
    id_producto: product.id,
    id_vendedor: product.id,
    nombre: product.name,
    descripcion: product.description,
    precio: product.price,
    stock: product.stock,
    estado: product.estado,
  };
}

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getProductUseCase: GetProductUseCase,
    private listProductsUseCase: ListProductsUseCase,
  ) {}

  @Post()
  @ApiOkResponse({ type: ProductDto })
  async create(@Body() dto: CreateProductDto): Promise<ProductDto> {
    const product = await this.createProductUseCase.execute(dto);
    return toProductDto(product)
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    const product = await this.getProductUseCase.execute(id);

    if (!product) {
    throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return toProductDto(product)
  }

  @Get()
  @ApiOkResponse({ type: ProductDto, isArray: true })
  async findAll(): Promise<ProductDto[]> {
    const products = await this.listProductsUseCase.execute();
    return products.map(toProductDto)
  }
}

