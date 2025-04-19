// src/utility/rabbitmq/rabbitmq.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitMqConfigService } from 'src/config/rabbitmq/rabbitmq-config.service';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
    public constructor(private readonly rabbitMqConfigService:RabbitMqConfigService){}
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }

  private async connect() {
    this.connection = await amqp.connect(this.rabbitMqConfigService.rabbitUrl);
    this.channel = await this.connection.createChannel();
  }

  private async close() {
    await this.channel?.close();
    await this.connection?.close();
  }

  async consume(queue: string, callback: (msg: amqp.ConsumeMessage) => Promise<void>) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          await callback(msg);
          this.channel.ack(msg);
        } catch (error) {
          this.channel.nack(msg);
        }
      }
    });
  }
}