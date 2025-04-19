import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get emailFromAddress(): string {
    return this.configService.get<string>('EMAIL_FROM_ADDRESS');
  }

  public get emailToAddress(): string {
    return this.configService.get<string>('EMAIL_REPORT_ADDRESS');
  }
}


