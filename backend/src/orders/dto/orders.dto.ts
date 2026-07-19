import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, OrderStatus } from '@prisma/client';

export class OrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  variantId?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  items: OrderItemDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shippingAddress: string; // JSON snapshot or formatted string

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.RAZORPAY })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ required: false, example: 'FESTIVE20' })
  @IsOptional()
  @IsString()
  couponCode?: string;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  giftWrap?: boolean;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ required: false, example: 'BLUEDART-78912345' })
  @IsOptional()
  @IsString()
  trackingNumber?: string;
}

export class CreateReturnDto {
  @ApiProperty({ example: 'Size too large / Fit issue' })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  images?: string[];
}
