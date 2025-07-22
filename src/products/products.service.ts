import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>,
) {}

  async create(createProductDto: CreateProductDto) {
    const newEntity = this.productRepository.create(createProductDto)
    return await this.productRepository.save(newEntity)
  }

  async findAll(page:number,limit:number) {
    const skip = (page - 1) * limit;
    const take = limit;
    const products = await this.productRepository.find({skip:skip, take:take})
    const total = await this.productRepository.count()
      const totalPages = Math.ceil(total/limit)

      return {
        page,
        limit,
        total,
        totalPages,
        data: products
      }
  }

  async findOne(id: number) {
    const search = await this.productRepository.findOneBy({id})
    if(!search){
      throw new NotFoundException(`Producto con el ID: ${id} no encontrado`)
    }
    return search
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
  // 1. Verificar si el producto existe
  await this.findOne(id); // Si no existe, aquí se lanzará la NotFoundException

  // 2. Actualizar el producto
  await this.productRepository.update(id, updateProductDto);

  // 3. Devolver el producto actualizado
  return this.findOne(id);
  }
  
  
  
  async remove(id: number) {
  // 1) buscar la entidad (puedes reutilizar findOne)
  const producto = await this.findOne(id);

  // 2) eliminarla
  return await this.productRepository.remove(producto);
}
}
