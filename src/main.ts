import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { environments } from './environments/environment';
import { join } from 'path';
import { CustomBadRequestFilter } from './filters/customBadRequest.filter';

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

  //Habilitar carpeta pública. De esta manera puedo acceder a los archivos que hay en la carpeta uploads poniendo el nombre del archivo en la url
  app.useStaticAssets(join(__dirname, '../public'))

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permite solicitudes desde este origen
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  });
  await app.listen(environments.PORT);
  console.log(`Servidor conectado ${environments.PORT}`)
}
bootstrap();
