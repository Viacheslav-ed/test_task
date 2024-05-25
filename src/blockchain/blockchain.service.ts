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

  async transfer(
    privateKey: string,
    transferDto: TransferDto,
  ): Promise<string> {
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
    console.log(await this.erc20Support(contractAddress));
    return 'tx hash';
  }

  /**
   * Since most ERC20 contracts do not support ERC165, we will determine
   * whether a contract supports the ERC20 interface by the presence
   * of selectors of the functions we need in its bytecode.
   */
  private async erc20Support(contractAddress: string): Promise<boolean> {
    const provider = this.provider();
    const bytecode = await provider.getCode(contractAddress);

    const isBalanceOf = bytecode.includes(
      ethers.id('balanceOf(address)').slice(2, 10),
    );
    const isTransfer = bytecode.includes(
      ethers.id('transfer(address,uint256)').slice(2, 10),
    );
    const isTransferFrom = bytecode.includes(
      ethers.id('transferFrom(address,address,uint256)').slice(2, 10),
    );
    console.log(isBalanceOf, isTransfer, isTransferFrom);

    return isBalanceOf && isTransfer && isTransferFrom;
  }

  private async erc20Decimals(contractAddress: string): Promise<bigint> {
    const contract = this.contract(contractAddress);
    return await contract.decimals();
  }
}
