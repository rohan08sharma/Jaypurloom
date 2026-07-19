import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Rohan Sharma', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '9123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreateAddressDto {
  @ApiProperty({ example: 'Flat 402, Royal Heritage Apartments, C-Scheme' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: 'Jaipur' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: 'Rajasthan' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ example: '302001' })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({ example: 'India', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: '9123456789' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
