import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Rohan Sharma' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'rohan@jaypurloom.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '9123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Customer@123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'rohan@jaypurloom.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Customer@123' })
  @IsNotEmpty()
  password: string;
}

export class GoogleLoginDto {
  @ApiProperty({ example: 'rohan@jaypurloom.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Rohan Sharma' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'google-oauth-token-or-id' })
  @IsNotEmpty()
  googleId: string;
}

export class SendOtpDto {
  @ApiProperty({ example: '9123456789' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '9123456789' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'rohan@jaypurloom.com' })
  @IsEmail()
  email: string;
}
