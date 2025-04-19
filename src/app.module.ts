import { Module } from '@nestjs/common';
import { SaleModule } from './api/sales/sales.module';
import { ConfigurationModule } from './config/configuration.module';
import { EmailModule } from './utility/email/email.module';
import { RabbitMQModule } from './utility/rabbit/rabbit.module';


@Module({
  imports: [ConfigurationModule,RabbitMQModule,EmailModule,SaleModule],
})
export class AppModule {}
