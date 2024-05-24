import {
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress()
  readonly contractAddress: string;

  @ApiProperty()
  @IsEthereumAddress()
  @IsNotEmpty()
  readonly userAddress: string;

  @ApiProperty()
  @IsEthereumAddress()
  @IsNotEmpty()
  readonly recipientAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}
