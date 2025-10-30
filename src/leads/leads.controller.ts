import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response as ExpressResponse } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Lead } from './entity/lead.entity';
import { UploadLeadsDto } from './dto/upload-leads.dto';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a CSV file of leads' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadLeadsDto })
  @ApiResponse({
    status: 201,
    description: 'Leads uploaded successfully',
    type: [Lead],
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadLeads(@UploadedFile() file: Express.Multer.File): Promise<Lead[]> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    return this.leadsService.uploadLeads(file);
  }

  @Post('score/:offerId')
  @ApiOperation({ summary: 'Run AI + rule-based scoring pipeline for an offer' })
  @ApiResponse({
    status: 200,
    description: 'Lead scoring completed successfully',
  })
  async runScoring(@Param('offerId') offerId: string) {
    return this.leadsService.runScoringPipeline(offerId);
  }

  @Get('results')
  @ApiOperation({ summary: 'Get all scored leads' })
  @ApiResponse({ status: 200, description: 'List of scored leads' })
  async getResults() {
    return this.leadsService.getResults();
  }

  @Get('export')
  @ApiOperation({ summary: 'Export all scored leads as CSV' })
  @ApiResponse({ status: 200, description: 'CSV file downloaded successfully' })
  async exportLeads(@Res() res: ExpressResponse) {
    return this.leadsService.exportLeadsToCSV(res);
  }
}
