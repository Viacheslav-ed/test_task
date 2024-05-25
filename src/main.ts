import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TEST REST API')
    .setDescription('Rest api for interaction with ERC20 contracts')
    .setVersion('1.0')
    .addBearerAuth({
      description:
        'Use for test - 0be1f909285aaa1aefa77509627954bbd66011f33fceadd84c9dc1cfd6f64650',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
