import { ApiProperty } from '@nestjs/swagger';

export class GetOrdersFilterDto {
  @ApiProperty({
    description: 'Filtro de status',
    required: false,
  })
  status?: string;
  @ApiProperty({
    description: 'Filtro de valor',
    required: false,
  })
  value?: string;
  @ApiProperty({
    description: 'Tipo de ordenação',
    required: false,
  })
  order_by?: string;
}
