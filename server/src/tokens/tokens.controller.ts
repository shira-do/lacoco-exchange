import { Controller, Get } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('/api/tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  findAll() {
    return this.tokensService.findAll();
  }
}
