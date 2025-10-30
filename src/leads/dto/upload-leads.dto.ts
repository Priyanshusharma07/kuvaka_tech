import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadLeadsDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'CSV file to upload' })
  @IsNotEmpty()
  file: any;
}
