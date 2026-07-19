import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, CreateReturnDto } from './dto/orders.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { OrderStatus, Role } from '@prisma/client';

@ApiTags('Orders & Checkout')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Place a new order with stock reservation, coupon deduction & payment simulation' })
  async createOrder(@Request() req: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('my-orders')
  @ApiOperation({ summary: 'Get logged-in customer order history' })
  async getCustomerOrders(@Request() req: any) {
    return this.ordersService.getCustomerOrders(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get detailed order snapshot by ID' })
  async getOrderDetails(@Request() req: any, @Param('id') orderId: string) {
    const isAdmin = req.user.role === Role.ADMIN;
    return this.ordersService.getOrderDetails(orderId, isAdmin ? undefined : req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/return')
  @ApiOperation({ summary: 'Initiate a return request for a delivered order' })
  async initiateReturn(@Request() req: any, @Param('id') orderId: string, @Body() dto: CreateReturnDto) {
    return this.ordersService.initiateReturn(req.user.id, orderId, dto);
  }

  // Admin Endpoints
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Get('admin/all')
  @ApiOperation({ summary: 'Admin list of all platform orders with optional status filter' })
  async getAllOrdersAdmin(@Query('status') status?: OrderStatus) {
    return this.ordersService.getAllOrdersAdmin(status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order tracking status and notify customer (Admin)' })
  async updateOrderStatus(@Param('id') orderId: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(orderId, dto);
  }
}
