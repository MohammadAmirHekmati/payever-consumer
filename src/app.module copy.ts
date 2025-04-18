import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { InvoiceModule } from './api/invoice/invoice.module';

@Module({
  imports: [ConfigurationModule,InvoiceModule],
})
export class AppModule {}
