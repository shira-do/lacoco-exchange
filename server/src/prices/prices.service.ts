import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { GeckoService } from 'src/gecko/gecko.service';
import { TokensService } from 'src/tokens/tokens.service';
import { Repository } from 'typeorm';
import Price from './entities/price.entity';
import { TPrice } from './types/price';

@Injectable()
export class PricesService {
  private logger = new Logger(PricesService.name);

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(GeckoService) private geckoService: GeckoService,
    @Inject(TokensService) private tokensService: TokensService,
    @InjectRepository(Price) private priceRepository: Repository<Price>,
  ) {}

  findAll() {
    // return `This action returns all prices`;
    return this.priceRepository.find();
  }

  findOne(pair: string) {
    // return `This action returns a #${id} price`;
    return this.priceRepository.findOne({
      where: { pair },
    });
  }

  async syncPrices() {
    this.logger.debug('Sync prices...');
    let listPrices = await this.priceRepository.find();

    const pairs = await this.makePairs();

    if (listPrices.length === 0)
      return this.priceRepository.save(
        pairs.map((pair) => Object.assign(new Price(), pair)),
      );

    return this.priceRepository.save(
      listPrices.map((price) => {
        const newPrice = pairs.find((pair) => pair.pair === price.pair);
        if (newPrice) {
          price.price = newPrice.price;
        }
        return price;
      }),
    );
  }

  async makePairs(): Promise<Array<TPrice>> {
    const tokens = this.tokensService.findAll();

    const tokenPrices = await this.geckoService.getTokenPriceInUSD();

    // generate pairs
    const pairs = [].concat(
      ...tokens.map((token, i) => {
        return tokens.slice(i + 1).map((token2) => ({
          pair: `${token.symbol.toUpperCase()}-${token2.symbol.toUpperCase()}`,
          price: tokenPrices[token.name].usd / tokenPrices[token2.name].usd,
        }));
      }),
    );

    // create reversed pairs
    const reversedPairs = pairs.map((pair) => ({
      pair: pair.pair.split('-').reverse().join('-'),
      price: 1 / pair.price,
    }));

    // merge
    return pairs.concat(reversedPairs);
  }
}
