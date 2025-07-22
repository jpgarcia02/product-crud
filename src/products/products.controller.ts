import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('Products') // Agrupa estos endpoints bajo la sección "Products" en Swagger
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Producto creado con éxito', type: Product })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Cantidad de elementos por página (máx. 100)' })
  @ApiResponse({ status: 200, description: 'Lista de productos paginados', type: [Product] })
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    let pageNum = Number(page);
    let limitNum = Number(limit);

    if (isNaN(pageNum) || pageNum < 1) {
      pageNum = 1;
    }
    if (isNaN(limitNum) || limitNum < 1) {
      limitNum = 10;
    }
    if (limitNum > 100) {
      limitNum = 100;
    }

    return this.productsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Product })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
