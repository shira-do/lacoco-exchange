import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TToken } from './types/token';

@Injectable()
export class TokensService {
  private supportedTokens: Array<TToken>;

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    const names = configService.get('SUPPORTED_TOKENS').split(',');
    const symbols = configService.get('SUPPORTED_TOKENS_SYMBOL').split(',');

    this.supportedTokens = names.map((name: string, index: number) => {
      return {
        name,
        symbol: symbols[index],
      };
    });
  }

  findAll() {
    // return `This action returns all tokens`;
    return this.supportedTokens;
  }
}
