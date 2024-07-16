import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PricesService } from '../prices.service';

@Injectable()
export class UpdatePriceScheduler {
  constructor(private readonly pricesService: PricesService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    console.log('Updating prices...');
    await this.pricesService.syncPrices();
  }
}
