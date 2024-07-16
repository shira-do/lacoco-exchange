import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GeckoModule } from '../gecko/gecko.module';
import { PricesService } from './prices.service';

describe('PricesService', () => {
  let service: PricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
        GeckoModule,
      ],
      providers: [PricesService],
    }).compile();

    service = module.get<PricesService>(PricesService);
  });

  it.skip('should be defined', () => {
    expect(service).toBeDefined();
  });
});
