import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Camiseta Negra', description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({ example: 49.99, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 10, description: 'Cantidad disponible en stock', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}