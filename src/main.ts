import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Nestjs API starter with GraphQL')
  .setDescription('Nestjs API description')
  .setVersion('1.0')
  .addTag('auth')
  .addTag('products')
  .addTag('orders')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, options); 
SwaggerModule.setup('api', app, document); 
// app.enableCors();
await app.listen(3000);
}
bootstrap();
