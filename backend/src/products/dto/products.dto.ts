import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VariantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  barcode?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ example: '#6B1D2F' })
  @IsOptional()
  @IsString()
  colorHex?: string;

  @ApiProperty({ example: 'M' })
  @IsNotEmpty()
  @IsString()
  size: string;

  @ApiProperty({ example: 4999 })
  @IsNumber()
  mrp: number;

  @ApiProperty({ example: 3299 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 15 })
  @IsNumber()
  stock: number;
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fabric: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  washCare?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  specifications?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isBestSeller?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isNewArrival?: boolean;

  @ApiProperty({ example: 12.0 })
  @IsOptional()
  @IsNumber()
  gstRate?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiProperty({ type: [VariantDto] })
  @IsArray()
  variants: VariantDto[];

  @ApiProperty({ example: [{ url: 'https://images.unsplash.com/...', isPrimary: true }] })
  @IsArray()
  images: { url: string; altText?: string; isPrimary?: boolean }[];
}
