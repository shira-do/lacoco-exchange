import { Controller, Get, Param } from '@nestjs/common';
import { PricesService } from './prices.service';

@Controller('/api/tokens/prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  findAll() {
    return this.pricesService.findAll();
  }

  @Get(':pair')
  findOne(@Param('pair') pair: string) {
    return this.pricesService.findOne(pair);
  }
}
