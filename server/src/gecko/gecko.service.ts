import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TGeckoSimplePriceResponse } from './types/gecko-reponse';

@Injectable()
export class GeckoService {
  private logger = new Logger(GeckoService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getTokenPriceInUSD() {
    const baseURL = this.configService.get<string>('COIN_GECKO_API');
    const api = this.configService.get<string>('COIN_GECKO_API_PRICE');
    const apiKey = this.configService.get<string>('COIN_GECKO_API_KEY');
    const supportedCoins = this.configService.get<string>('SUPPORTED_TOKENS');
    const defaultCurrency = this.configService.get<string>('DEFAULT_CURRENCY');

    const url = `${baseURL}${api}`;

    const query = new URLSearchParams();
    query.set('ids', supportedCoins);
    query.set('vs_currencies', defaultCurrency);
    query.set('x_cg_demo_api_key', apiKey);

    const response =
      await this.httpService.axiosRef.get<TGeckoSimplePriceResponse>(
        `${url}?${query.toString()}`,
      );

    if (response.status === HttpStatus.OK) {
      return response.data as TGeckoSimplePriceResponse;
    }

    throw new BadRequestException('Failed to fetch token price');
  }
}
