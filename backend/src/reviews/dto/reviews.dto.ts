import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Absolutely Stunning & Royal' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'The Chanderi silk is gorgeous and the fit is exact as shown in size chart.' })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  images?: string[];
}
