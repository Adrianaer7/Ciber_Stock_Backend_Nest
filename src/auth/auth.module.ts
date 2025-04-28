import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../usuarios/entities/create.user.entity';
import { JwtModule } from '@nestjs/jwt';
import { environments } from 'src/environments/environment';



@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
    JwtModule.register({
      global: true,
      secret: environments.SECRETA,
      signOptions: { expiresIn: '6h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
