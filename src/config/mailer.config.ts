import { MailerOptions } from '@nestjs-modules/mailer'; 
import { ConfigService } from '@nestjs/config'; 
import { environments } from 'src/environments/environment';

export const mailerConfig = async (configService: ConfigService): Promise<MailerOptions> => ({ 
    transport: { 
        host: environments.EMAIL_HOST, 
        port: environments.EMAIL_PORT, 
        secure: false,
        auth: { 
            user: environments.EMAIL_USER, 
            pass: environments.EMAIL_PASS 
        }
    }
})