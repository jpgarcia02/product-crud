import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { PRODUCTS_SEED } from './products.seed';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async seedProducts() {
    // Borra todo para evitar duplicados
    await this.productRepo.clear();

    // Inserta los productos de prueba
    const products = this.productRepo.create(PRODUCTS_SEED);
    return await this.productRepo.save(products);
  }
}



