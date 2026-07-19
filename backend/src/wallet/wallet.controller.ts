import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Customer Digital Wallet')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ApiOperation({ summary: 'Get current wallet balance and transaction history' })
  async getBalanceAndHistory(@Request() req: any) {
    return this.walletService.getBalanceAndHistory(req.user.id);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add funds to digital wallet (Simulated payment)' })
  async addFunds(@Request() req: any, @Body() body: { amount: number }) {
    return this.walletService.addFunds(req.user.id, Number(body.amount));
  }
}
