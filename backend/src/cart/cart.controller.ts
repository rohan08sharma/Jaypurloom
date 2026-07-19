import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Shopping Cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user shopping cart items and price breakdown' })
  async getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add product variant to cart' })
  async addToCart(@Request() req: any, @Body() body: { variantId: string; quantity?: number }) {
    return this.cartService.addToCart(req.user.id, body.variantId, body.quantity || 1);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cart line item quantity' })
  async updateQuantity(@Request() req: any, @Param('id') cartItemId: string, @Body() body: { quantity: number }) {
    return this.cartService.updateQuantity(req.user.id, cartItemId, body.quantity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from shopping cart' })
  async removeItem(@Request() req: any, @Param('id') cartItemId: string) {
    return this.cartService.removeItem(req.user.id, cartItemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear entire shopping cart' })
  async clearCart(@Request() req: any) {
    return this.cartService.clearCart(req.user.id);
  }
}
