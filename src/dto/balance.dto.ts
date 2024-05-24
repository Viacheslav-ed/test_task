import { IsEthereumAddress } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BalanceDto {
  @ApiProperty()
  @IsEthereumAddress()
  readonly contractAddress: string;

  @ApiProperty()
  @IsEthereumAddress()
  readonly userAddress: string;
}
