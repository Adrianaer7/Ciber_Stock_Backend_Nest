import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'; 
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { environments } from './environments/environment';
import { join } from 'node:path';
import { CustomBadRequestFilter } from './filters/customBadRequest.filter';
import { corsOptions } from './config/cors.config';

async function bootstrap() {
  //se le puede aclarar si quiero que se construya la app sobre Express o Fastify
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //esto permite que se cumplan las validaciones del dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,   //Si se establece como verdadero, en lugar de eliminar las propiedades que no están en la lista blanca, el validador arrojará un error.
    })
  )
  //personalizar objeto de respuesta
  app.useGlobalFilters(new CustomBadRequestFilter())

  // Habilitar CORS
  app.enableCors(corsOptions)

  //Habilitar carpeta pública. De esta manera puedo acceder a los archivos que hay en la carpeta uploads poniendo el nombre del archivo en la url
  app.useStaticAssets(join(__dirname, '../static'), {
    prefix: '/static',
  });

  //maximo tamaño de payload
  app.use(express.json({ limit: '5mb' }));
  
  await app.listen(environments.PORT);
  console.log(`Servidor conectado ${environments.PORT}`)
}
bootstrap();
