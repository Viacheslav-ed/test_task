import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BlockchainService } from './blockchain/blockchain.service';

@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get()
  async getBalance(): Promise<bigint> {
    return await this.blockchainService.getBalance();
  }
}
