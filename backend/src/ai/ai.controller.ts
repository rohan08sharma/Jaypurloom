import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('AI Stylist & Smart Search')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('stylist-search')
  @ApiOperation({ summary: 'Analyze natural language prompt and return tailored recommendations with stylist advice' })
  async stylistSearch(@Body() body: { prompt: string }) {
    return this.aiService.stylistSearch(body.prompt || '');
  }
}
