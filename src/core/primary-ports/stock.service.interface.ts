import { StockModel } from "../../../../../../Stock-Backend-Master/stock-backend-master/src/core/models/stock.model";
import { Stock } from "../../../../../../Stock-Backend-Master/stock-backend-master/src/infrastructure/data-source/stock.entity";



export const IStockServiceProvider = 'IStockServiceProvider';
export interface IStockService {
  newStock(
    id: string,
    stockName: string,
    initValue: number,
    currentValue: number,
    description: string,
  ): Promise<StockModel>;

  getStocks(): Promise<StockModel[]>;

  delete(id: string): Promise<void>;

  updateStock(id: string): Promise<Stock>;

  getStockId(id: string, stockName: string, initValue: number, currentValue: number, description: string): Promise<Stock>;
}
