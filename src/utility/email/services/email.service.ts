// src/email/email.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { SendMailDto } from '../dto/send-mail.dto';
import { EmailConfigService } from 'src/config/email/email-config.service';

@Injectable()
export class EmailService {
  public constructor(private readonly emailConfigService:EmailConfigService){}
  private readonly logger = new Logger(EmailService.name);

  async sendDailyReport(to: string, subject: string, html: string) {
    try {
      
        const sendMailDto:SendMailDto={
            from:this.emailConfigService.emailFromAddress,
            to,
            html,
            subject
        }
      await this.sendMail(sendMailDto);
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error('Email sending failed', error.stack);
      throw error;
    }
  }

  private async sendMail(sendMailDto:SendMailDto):Promise<void>{
    this.logger.log("email sended.")
  }
}