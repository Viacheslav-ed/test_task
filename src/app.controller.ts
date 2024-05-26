import { Controller, Get, Post, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BlockchainService } from './blockchain/blockchain.service';
import { BalanceDto } from './dto/balance.dto';
import { TransferDto } from './dto/transfer.dto';
import { PrivateKey } from './decorators/private_key.decorator';

@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('balance/:contractAddress/:userAddress')
  async balance(@Param() balanceDto: BalanceDto): Promise<bigint> {
    return await this.blockchainService.balance(balanceDto);
  }

  @Post()
  async transfer(
    @PrivateKey() privateKey: string,
    @Body() transferDto: TransferDto,
  ): Promise<string> {
    return await this.blockchainService.transfer(privateKey, transferDto);
  }
}
