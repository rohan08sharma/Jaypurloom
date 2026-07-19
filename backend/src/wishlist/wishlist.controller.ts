import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Wishlist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user saved wishlist items' })
  async getWishlist(@Request() req: any) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Post('toggle')
  @ApiOperation({ summary: 'Toggle product in wishlist (add if missing, remove if present)' })
  async toggleWishlist(@Request() req: any, @Body() body: { productId: string }) {
    return this.wishlistService.toggleWishlist(req.user.id, body.productId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear wishlist' })
  async clearWishlist(@Request() req: any) {
    return this.wishlistService.clearWishlist(req.user.id);
  }
}
