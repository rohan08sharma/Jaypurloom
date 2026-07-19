import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CouponType } from '@prisma/client';

export class CreateCouponDto {
  @ApiProperty({ example: 'DIWALI25' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ enum: CouponType, example: CouponType.PERCENTAGE })
  @IsEnum(CouponType)
  type: CouponType;

  @ApiProperty({ example: 25.0 })
  @IsNumber()
  value: number;

  @ApiProperty({ example: 3000 })
  @IsNumber()
  minOrderAmount: number;

  @ApiProperty({ required: false, example: 1000 })
  @IsOptional()
  @IsNumber()
  maxDiscount?: number;

  @ApiProperty({ example: '2027-12-31T23:59:59.000Z' })
  @IsNotEmpty()
  @IsString()
  expiryDate: string;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  usageLimit?: number;
}

export class ValidateCouponDto {
  @ApiProperty({ example: 'FESTIVE20' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 4500 })
  @IsNumber()
  orderTotal: number;
}
