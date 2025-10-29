import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config(); // ✅ load environment variables early

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kuvaka Tech Task API')
    .setDescription('API documentation for my NestJS app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3005);
  console.log(` Server running on http://localhost:3005`);
  console.log(` Swagger docs available at http://localhost:3005/api`);
}

bootstrap();
