import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GeckoModule } from '../gecko/gecko.module';
import { GeckoService } from '../gecko/gecko.service';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';

describe('PricesController', () => {
  let controller: PricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
        GeckoModule,
      ],
      controllers: [PricesController],
      providers: [PricesService, GeckoService],
    }).compile();

    controller = module.get<PricesController>(PricesController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
