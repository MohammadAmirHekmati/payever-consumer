// src/sales/sales.processor.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SalesService } from './sales.service';
import { RabbitMQService } from 'src/utility/rabbit/services/rabbit.service';


@Injectable()
export class SalesProcessorService implements OnModuleInit {
  constructor(
    private readonly rabbitService: RabbitMQService,
    private readonly salesService: SalesService
  ) {}

  async onModuleInit() {
    await this.setupConsumer();
  }

  async setupConsumer() {
    await this.rabbitService.consume(
      'daily_sales_report',
      async (msg) => {
        const content = JSON.parse(msg.content.toString());
        await this.salesService.processDailyReport(content);
      }
    );
  }
}