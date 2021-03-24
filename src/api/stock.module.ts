import {Stock} from "../infrastructure/stock.entity";
import {StockGateway} from "./gateway/stock.gateway";
import {IStockServiceProvider} from "../core/primary-ports/stock.service.interface";
import {StockService} from "../core/services/stock.service";
import {Module} from "@nestjs/common";


@Module({
  imports: [
    TypeOrmModule.forFeature([Stock])
  ],
  providers: [
    StockGateway,
    {
      provide: IStockServiceProvider,
      useClass: StockService,
    },
  ],
})
export class StockModule {}
