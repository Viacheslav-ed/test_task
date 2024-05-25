import { IsEthereumAddress, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BalanceDto {
  @ApiProperty({
    default: '0x697Edd7C1A16B439151157237332aF7d8caf2e9c',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  readonly contractAddress: string;

  @ApiProperty({
    default: '0x79Ee822Bd648D280bf778CeB2DE59df0e6e0704D',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  readonly userAddress: string;
}
