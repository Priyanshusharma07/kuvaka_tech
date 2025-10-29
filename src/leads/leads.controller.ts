import {
    Controller,
    Post,
    Get,
    Query,
    UploadedFile,
    UseInterceptors,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiConsumes,
    ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LeadsService } from './leads.service';
import { Lead } from './entity/lead.entity';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    // --- Upload CSV ---
    @Post('upload')
    @ApiOperation({ summary: 'Upload a CSV file of leads' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'CSV file containing leads data',
                },
            },
        },
    })
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

    // --- Scoring API ---
    @Post('score')
    @ApiOperation({ summary: 'Run scoring pipeline for uploaded leads' })
    @ApiQuery({
        name: 'offerId',
        required: true,
        description: 'Offer ID to use for scoring',
    })
    @ApiResponse({
        status: 200,
        description: 'Leads scored successfully',
        type: [Lead],
    })
    async scoreLeads(@Query('offerId') offerId: string): Promise<Lead[]> {
        return this.leadsService.runScoringPipeline(offerId);
    }

    // --- Get results API ---
    @Get('results')
    @ApiOperation({ summary: 'Get all scored leads' })
    @ApiResponse({
        status: 200,
        description: 'List of scored leads',
        type: [Lead],
    })
    async getResults(): Promise<Lead[]> {
        return this.leadsService.getResults();
    }
}
