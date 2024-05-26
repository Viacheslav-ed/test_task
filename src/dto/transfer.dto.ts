import {
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty({
    default: '0x697Edd7C1A16B439151157237332aF7d8caf2e9c',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  readonly contractAddress: string;

  @ApiProperty({
    default: '0x79Ee822Bd648D280bf778CeB2DE59df0e6e0704D',
  })
  @IsEthereumAddress()
  @IsNotEmpty()
  readonly userAddress: string;

  @ApiProperty({
    default: '0x2Bd251A29940b9Ba60dd72d2878EDf60dd6f77Ed',
  })
  @IsEthereumAddress()
  @IsNotEmpty()
  readonly recipientAddress: string;

  @ApiProperty({
    default: 1.55,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}
