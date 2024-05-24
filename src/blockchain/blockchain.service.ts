import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private provider(): ethers.JsonRpcProvider {
    const provider = new ethers.JsonRpcProvider(
      process.env.RPC_PROVIDER ||
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
    );
    return provider;
  }

  private wallet(privateKey: string): ethers.Wallet {
    const wallet = new ethers.Wallet(privateKey);
    return wallet;
  }

  async getBalance(): Promise<bigint> {
    const provider = this.provider();
    const wallet = this.wallet(
      '0be1f909285aaa1aefa77509627954bbd66011f33fceadd84c9dc1cfd6f64650',
    );
    console.log(wallet.address);
    return await provider.getBalance(
      '0x79Ee822Bd648D280bf778CeB2DE59df0e6e0704D',
    );
  }
}
