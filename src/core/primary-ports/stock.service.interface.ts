import {StockModel} from "../models/stock.model";
import {Stock} from "../../infrastructure/stock.entity";


export const IStockServiceProvider = 'IStockServiceProvider';
export interface IStockService {
  newStock(
    id: string,
    stockModel: StockModel
  ): Promise<StockModel>;

  getStocks(): Promise<StockModel[]>;

  delete(id: string): Promise<void>;

  update(id: string, stock: StockModel): Promise<StockModel>;

  getStockId(id: string, stockName: string, initValue: number, currentValue: number, description: string): Promise<Stock>;

}
