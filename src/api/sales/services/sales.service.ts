import { Injectable } from "@nestjs/common";
import { SalesProcessorService } from "./sales.proccessor";
import { EmailService } from "src/utility/email/services/email.service";
import { IDailyReport } from "../interfaces/daily-report.interface";
import { EmailConfigService } from "src/config/email/email-config.service";

// In sales.service.ts
@Injectable()
export class SalesService {
  constructor(private readonly emailService:EmailService,
    private readonly emailConfigService:EmailConfigService
  ) {}

  async processDailyReport(report: IDailyReport) {
   try {
     // 1. Generate email content
     const emailContent = this.generateEmailContent(report);
     // 2. Send email (implementation details hidden)
     await this.emailService.sendDailyReport(
       this.emailConfigService.emailToAddress,
       'Daily Sales Report',
       emailContent
     );
   } catch (error) {
    console.log(error)
    process.exit(0)
   }
  }

  private generateEmailContent(report: IDailyReport): string {
    const itemsList = Object.entries(report.itemsSold)
      .map(([sku, quantity]) => `<li>${sku}: ${quantity} units</li>`)
      .join('');
  
      const emailHtml = [
        '<h1>Daily Sales Report</h1>',
        `<p>Date: ${new Date(report.endDate).toLocaleDateString()}</p>`,
        `<h2>Total Sales: $${report.totalSales.toFixed(2)}</h2>`,
        '<h3>Items Sold:</h3>',
        '<ul>',
        itemsList,
        '</ul>'
      ].join('');

      return emailHtml

    }
}