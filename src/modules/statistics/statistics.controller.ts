import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DateRangeDto } from './dto/date-range.dto';
import { StatisticsService } from './statistics.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({ summary: 'Get dashboard statistics' })
  @Get('dashboard')
  async getDashboardStats() {
    return this.statisticsService.getDashboardStats();
  }

  @ApiOperation({ summary: 'Get order statistics by status' })
  @Get('orders')
  async getOrderStats() {
    return this.statisticsService.getOrderStats();
  }

  @ApiOperation({ summary: 'Get revenue statistics by date range' })
  @Post('revenue')
  async getRevenueStats(@Body() dateRange: DateRangeDto) {
    return this.statisticsService.getRevenueStats(
      new Date(dateRange.startDate),
      new Date(dateRange.endDate),
    );
  }

  @ApiOperation({ summary: 'Get daily order counts by date range' })
  @Post('daily-order-counts')
  async getDailyOrderCounts(@Body() dateRange: DateRangeDto) {
    return this.statisticsService.getDailyOrderCounts(
      new Date(dateRange.startDate),
      new Date(dateRange.endDate),
    );
  }

  @ApiOperation({ summary: 'Get daily order total amounts by date range' })
  @Post('daily-order-totals')
  async getDailyOrderTotals(@Body() dateRange: DateRangeDto) {
    return this.statisticsService.getDailyOrderTotals(
      new Date(dateRange.startDate),
      new Date(dateRange.endDate),
    );
  }
}
