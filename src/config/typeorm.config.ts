import { ConfigService } from '@nestjs/config'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { environments } from 'src/environments/environment'


export const typeOrmConfig = (configService: ConfigService) : TypeOrmModuleOptions => ({
    type: 'mongodb',  
    url: environments.DB_URL,    //configService.get('DB_URL') en caso de guardarlas en .env
    entities: [join(__dirname + '../../**/*.entity.{js,ts}')], 
    synchronize: true,
    logging: true
})