import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Inventory Management')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get live inventory summary with Low Stock and Out of Stock alerts (Admin)' })
  async getInventorySummary() {
    return this.inventoryService.getInventorySummary();
  }

  @Patch('adjust/:variantId')
  @ApiOperation({ summary: 'Adjust stock count manually (Admin)' })
  async adjustStock(
    @Param('variantId') variantId: string,
    @Body() body: { quantityChange: number; reason?: string },
  ) {
    return this.inventoryService.adjustStock(variantId, Number(body.quantityChange), body.reason);
  }
}
