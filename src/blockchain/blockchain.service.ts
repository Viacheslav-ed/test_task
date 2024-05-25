import { BadRequestException, Injectable } from '@nestjs/common';
import { Wallet, JsonRpcProvider, Contract, ethers } from 'ethers';
import { BalanceDto } from 'src/dto/balance.dto';
import { TransferDto } from 'src/dto/transfer.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const abi = require('../../erc20.abi.json').abi;

@Injectable()
export class BlockchainService {
  async balance(balanceDto: BalanceDto): Promise<bigint> {
    const { contractAddress, userAddress } = balanceDto;
    return await this._balance(contractAddress, userAddress);
  }

  async transfer(
    privateKey: string,
    transferDto: TransferDto,
  ): Promise<string> {
    const { contractAddress, userAddress, recipientAddress, amount } =
      transferDto;

    if (!(await this._erc20Support(contractAddress)))
      throw new BadRequestException('Wrong contract address');

    const wallet = this._wallet(privateKey);
    const contract = this._contractWithSigner(contractAddress, wallet);

    const decimals: bigint = await this._erc20Decimals(contractAddress);
    const transferAmount = BigInt(amount * 10 ** Number(decimals));

    if (wallet.address.toUpperCase() != userAddress.toUpperCase()) {
      const allowance = await this._allowance(
        contractAddress,
        userAddress,
        wallet.address,
      );
      console.log(allowance, transferAmount);
      if (allowance < transferAmount)
        throw new BadRequestException('Insufficient allowance');

      return (
        await contract.transferFrom(
          userAddress,
          recipientAddress,
          transferAmount,
        )
      ).hash;
    }

    const balance = await this._balance(contractAddress, userAddress);

    if (balance < transferAmount)
      throw new BadRequestException('Insufficient balance');

    return (await contract.transfer(recipientAddress, transferAmount)).hash;
  }

  private _provider(): JsonRpcProvider {
    return new JsonRpcProvider(
      process.env.RPC_PROVIDER ||
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
    );
  }

  private _wallet(privateKey: string): Wallet {
    const provider = this._provider();
    return new ethers.Wallet(privateKey, provider);
  }

  private _contract(contractAddress: string): Contract {
    const provider = this._provider();
    return new ethers.Contract(contractAddress, abi, provider);
  }

  private _contractWithSigner(
    contractAddress: string,
    signer: Wallet,
  ): ethers.Contract {
    return new ethers.Contract(contractAddress, abi, signer);
  }

  /**
   * Since most ERC20 contracts do not support ERC165, we will determine
   * whether a contract supports the ERC20 interface by the presence
   * of selectors of the functions we need in its bytecode.
   */
  private async _erc20Support(contractAddress: string): Promise<boolean> {
    const provider = this._provider();
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
    const isDecimals = bytecode.includes(ethers.id('decimals()').slice(2, 10));
    const isAllowance = bytecode.includes(
      ethers.id('allowance(address,address)').slice(2, 10),
    );

    return (
      isBalanceOf && isTransfer && isTransferFrom && isDecimals && isAllowance
    );
  }

  private async _erc20Decimals(contractAddress: string): Promise<bigint> {
    const contract = this._contract(contractAddress);
    return await contract.decimals();
  }

  private async _balance(
    contractAddress: string,
    userAddress: string,
  ): Promise<bigint> {
    const contract = this._contract(contractAddress);
    return await contract.balanceOf(userAddress);
  }

  private async _allowance(
    contractAddress: string,
    ownerAddress: string,
    spenderAddress: string,
  ): Promise<bigint> {
    const contract = this._contract(contractAddress);
    return await contract.allowance(ownerAddress, spenderAddress);
  }
}
