import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  });

  // Global API Prefix
  app.setGlobalPrefix('api/v1');

  // Serve static uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger OpenAPI Setup
  const config = new DocumentBuilder()
    .setTitle('👑 Jaypurloom Enterprise E-Commerce API')
    .setDescription(
      `Complete production-ready REST API for Jaypurloom — Premium Women's Ethnic Wear & Home Furnishing.
      Features full multi-variant catalog, AI stylist search, Razorpay/UPI checkout flow, digital wallet, and role-based administration.`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Jaypurloom API Docs',
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`👑 Jaypurloom Enterprise Backend API running on port: ${port}`);
  console.log(`📘 Swagger OpenAPI Docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
