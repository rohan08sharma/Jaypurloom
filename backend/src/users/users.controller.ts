import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto, CreateAddressDto } from './dto/users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Users & Addresses')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Get logged-in user profile with addresses' })
  async getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('profile')
  @ApiOperation({ summary: 'Update profile info' })
  async updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('addresses')
  @ApiOperation({ summary: 'Get saved delivery addresses' })
  async getAddresses(@Request() req: any) {
    return this.usersService.getAddresses(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('addresses')
  @ApiOperation({ summary: 'Create new delivery address' })
  async createAddress(@Request() req: any, @Body() dto: CreateAddressDto) {
    return this.usersService.createAddress(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('addresses/:id')
  @ApiOperation({ summary: 'Delete a saved delivery address' })
  async deleteAddress(@Request() req: any, @Param('id') addressId: string) {
    return this.usersService.deleteAddress(req.user.id, addressId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Get('admin/customers')
  @ApiOperation({ summary: 'Admin list of all customers with lifetime spend metrics' })
  async getAllCustomers() {
    return this.usersService.getAllCustomers();
  }
}
