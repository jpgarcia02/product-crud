import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({
    example: 1,
    description: 'ID único del producto',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Camiseta Negra',
    description: 'Nombre del producto',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 49.99,
    description: 'Precio del producto',
  })
  @Column('decimal')
  price: number;

  @ApiProperty({
    example: true,
    description: 'Indica si el producto está activo o no',
  })
  @Column({ default: true })
  is_active: boolean;
}
