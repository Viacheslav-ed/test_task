import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { BalanceDto } from 'src/dto/balance.dto';
import { TransferDto } from 'src/dto/transfer.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const abi = require('../../erc20.abi.json').abi;

@Injectable()
export class BlockchainService {
  private provider(): ethers.JsonRpcProvider {
    return new ethers.JsonRpcProvider(
      process.env.RPC_PROVIDER ||
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
    );
  }
  private contract(contractAddress: string): ethers.Contract {
    const provider = this.provider();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    return contract;
  }

  private contractWithSigner(
    contractAddress: string,
    privateKey: string,
  ): ethers.Contract {
    const provider = this.provider();
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    return contract;
  }

  async balance(balanceDto: BalanceDto): Promise<bigint> {
    const { contractAddress, userAddress } = balanceDto;

    console.log('balanceDto', contractAddress, userAddress);
    const contract = this.contract(contractAddress);
    const balance = await contract.balanceOf(userAddress);
    console.log('balance', balance);
    return balance;
  }

  async transfer(privateKey: string, transferDto: TransferDto) {
    const { contractAddress, userAddress, recipientAddress, amount } =
      transferDto;
    console.log(
      'transferDto',
      privateKey,
      contractAddress,
      userAddress,
      recipientAddress,
      amount,
    );
  }
}
