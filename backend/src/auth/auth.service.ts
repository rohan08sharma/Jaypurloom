import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, GoogleLoginDto, SendOtpDto, VerifyOtpDto, ForgotPasswordDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          ...(dto.phone ? [{ phone: dto.phone }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email or phone already exists.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password: hashedPassword,
        isVerified: true,
      },
    });

    const token = this.generateToken(user);
    const { password, ...userInfo } = user;

    return {
      message: 'Registration successful! Welcome to Jaypurloom.',
      token,
      user: userInfo,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = this.generateToken(user);
    const { password, ...userInfo } = user;

    return {
      message: 'Login successful!',
      token,
      user: userInfo,
    };
  }

  async googleLogin(dto: GoogleLoginDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      const dummyPassword = await bcrypt.hash(`google_${Date.now()}_${Math.random()}`, 10);
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: dummyPassword,
          isVerified: true,
        },
      });
    }

    const token = this.generateToken(user);
    const { password, ...userInfo } = user;

    return {
      message: 'Google login successful!',
      token,
      user: userInfo,
    };
  }

  async sendOtp(dto: SendOtpDto) {
    let user = await this.prisma.user.findFirst({
      where: { phone: dto.phone },
    });

    if (!user) {
      // Create guest or placeholder account with phone
      const dummyPassword = await bcrypt.hash(`otp_${Date.now()}`, 10);
      user = await this.prisma.user.create({
        data: {
          phone: dto.phone,
          email: `${dto.phone}@jaypurloom-mobile.local`,
          name: `Customer (${dto.phone.slice(-4)})`,
          password: dummyPassword,
          isVerified: true,
        },
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode: otp,
        otpExpires: expires,
      },
    });

    return {
      success: true,
      message: `Verification OTP generated successfully.`,
      // Return OTP directly in simulation mode for zero-friction testing
      demoOtp: otp,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.prisma.user.findFirst({
      where: { phone: dto.phone },
    });

    if (!user || user.otpCode !== dto.otp) {
      throw new BadRequestException('Invalid or expired OTP verification code.');
    }

    if (user.otpExpires && new Date() > user.otpExpires) {
      throw new BadRequestException('OTP verification code has expired.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode: null,
        otpExpires: null,
        isVerified: true,
      },
    });

    const token = this.generateToken(user);
    const { password, ...userInfo } = user;

    return {
      message: 'Mobile OTP verified successfully!',
      token,
      user: userInfo,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return {
        success: true,
        message: 'If an account exists with this email, password recovery instructions have been sent.',
      };
    }

    const resetToken = Math.random().toString(36).substring(2, 15);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken },
    });

    return {
      success: true,
      message: 'Password recovery instructions generated successfully.',
      demoResetToken: resetToken,
    };
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
