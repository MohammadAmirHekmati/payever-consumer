// src/utility/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQService } from './services/rabbit.service';

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}