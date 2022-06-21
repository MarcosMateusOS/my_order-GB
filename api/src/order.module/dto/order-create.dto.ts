import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrderCreateDto {
  @ApiProperty({
    description: 'Valor do pedido',
  })
  @IsNotEmpty({ message: 'O valor do pedito é obrigatório.' })
  value: string;

  @ApiProperty({
    description: 'O nome do produto',
  })
  @IsNotEmpty({ message: 'O Nome do produto é obrigatório' })
  product: string;

  @ApiProperty({
    description: 'O status atual do pedido',
  })
  @IsNotEmpty({ message: 'O Status do produto é obrigatório' })
  status: string;
}
