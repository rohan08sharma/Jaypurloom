import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Reports & Analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales-summary')
  @ApiOperation({ summary: 'Get daily and monthly sales revenue overview (Admin)' })
  async getSalesSummary() {
    return this.reportsService.getSalesSummary();
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Get top selling ethnic wear and bedsheet bestsellers (Admin)' })
  async getTopProductsAndCategories() {
    return this.reportsService.getTopProductsAndCategories();
  }

  @Get('gst-report')
  @ApiOperation({ summary: 'Get GST tax breakdown (12% vs 18%) for accounting export (Admin)' })
  async getGstReport() {
    return this.reportsService.getGstReport();
  }
}
