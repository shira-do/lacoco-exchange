import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { GeckoService } from './gecko/gecko.service';
import { PricesService } from './prices/prices.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(GeckoService) private readonly geckoService: GeckoService,
    @Inject(PricesService) private readonly pricesService: PricesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  test() {
    // return this.geckoService.getTokenPriceInUSD();
    return this.pricesService.syncPrices();
  }
}
