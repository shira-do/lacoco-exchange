import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GeckoService } from './gecko.service';

describe('GeckoService', () => {
  let service: GeckoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
      providers: [GeckoService, ConfigService],
    }).compile();

    service = module.get<GeckoService>(GeckoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get token price in USD', async () => {
    const tokenSymbol = 'eth';
    const price = await service.getTokenPriceInUSD();
    expect(price).toBeDefined();
    expect(typeof price).toBe('object');
    expect(typeof price?.bitcoin?.usd).toBe('number');
  });
});
