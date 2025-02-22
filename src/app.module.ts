import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerExceptionFilter } from './filters/throttler-exception.filter';
import { mailerConfig } from './config/mailer.config';
import { ProductosModule } from './productos/productos.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { RubrosModule } from './rubros/rubros.module';
import { CodigosModule } from './codigos/codigos.module';
import { VentasModule } from './ventas/ventas.module';
import { ComprasModule } from './compras/compras.module';
import { DolaresModule } from './dolares/dolares.module';
import { FaltantesModule } from './faltantes/faltantes.module';
import { PorcentajesModule } from './porcentajes/porcentajes.module';
import { GarantiasModule } from './garantias/garantias.module';
import { ImagenesModule } from './imagenes/imagenes.module';


@Module({
  imports: [
    //.envs
    ConfigModule.forRoot({ isGlobal: true}),
    //BD connection
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService] //injecta el ConfigService en el typeOrmConfig
    }),
    //Mail
    MailerModule.forRootAsync({
      useFactory: mailerConfig,
      inject: [ConfigService]
    }),
    //Limiter
    ThrottlerModule.forRoot([{
      ttl: 100000,// Tiempo de vida en ms (ventana de tiempo)
      limit: 50, // Cantidad máxima de solicitudes permitidas en esa ventana
    }]),
    //Modulos propios
    AuthModule,
    UsuariosModule,
    MailModule,
    ProductosModule,
    ProveedoresModule,
    RubrosModule,
    CodigosModule,
    VentasModule,
    ComprasModule,
    DolaresModule,
    FaltantesModule,
    PorcentajesModule,
    GarantiasModule,
    ImagenesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //Personalizar mensaje del Filter
    { 
      provide: APP_FILTER, 
      useClass: ThrottlerExceptionFilter
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      next();
    }).forRoutes('*');
  }
}
