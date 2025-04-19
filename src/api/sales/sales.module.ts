import { Module } from "@nestjs/common";
import { SalesProcessorService } from "./services/sales.proccessor";
import { SalesService } from "./services/sales.service";
import { RabbitMQModule } from "src/utility/rabbit/rabbit.module";
import { EmailModule } from "src/utility/email/email.module";

@Module({
    imports:[RabbitMQModule,EmailModule],
    providers:[SalesProcessorService,SalesService]
})
export class SaleModule{}