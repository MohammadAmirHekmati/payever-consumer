import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app/app-config.service';
import { RabbitMqConfigService } from './rabbitmq/rabbitmq-config.service';
import { envValidationSchema } from './validation/env.vallidation';
import { EmailConfigService } from './email/email-config.service';

@Global()
@Module({
  providers: [AppConfigService, RabbitMqConfigService,EmailConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
  ],
  exports: [AppConfigService, RabbitMqConfigService,EmailConfigService],
})
export class ConfigurationModule {}
