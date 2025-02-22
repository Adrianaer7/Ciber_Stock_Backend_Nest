import { Module } from '@nestjs/common';
import { PorcentajesService } from './porcentajes.service';
import { PorcentajesController } from './porcentajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Porcentajes } from './entities/porcentajes.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Porcentajes]),
    AuthModule
  ],
  controllers: [PorcentajesController],
  providers: [PorcentajesService],
  exports: [PorcentajesService]
})
export class PorcentajesModule {}
