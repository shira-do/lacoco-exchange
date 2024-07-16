import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeckoModule } from 'src/gecko/gecko.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { UpdatePriceScheduler } from './cronjobs/update-price.scheduler';
import Price from './entities/price.entity';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), GeckoModule, TokensModule],
  controllers: [PricesController],
  providers: [PricesService, UpdatePriceScheduler],
  exports: [PricesService],
})
export class PricesModule {}
