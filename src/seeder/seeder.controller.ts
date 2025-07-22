import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seed')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('products')
  async runSeed() {
    return await this.seederService.seedProducts();
  }
}
