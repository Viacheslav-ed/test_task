import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BlockchainService } from './blockchain/blockchain.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [BlockchainService],
})
export class AppModule {}
