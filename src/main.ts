import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  // 1. Configuración del título, descripción y versión
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API para gestionar productos con CRUD y paginación')
    .setVersion('1.0')
    .build();

  // 2. Crear el documento
  const document = SwaggerModule.createDocument(app, config);

  // 3. Habilitar Swagger en la ruta /api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
