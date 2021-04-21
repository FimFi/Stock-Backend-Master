
import { Repository } from "typeorm";

import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import {IStockService} from "../primary-ports/stock.service.interface";
import {StockModel} from "../models/stock.model";
import {Stock} from "../../infrastructure/stock.entity";


@Injectable()
export class StockService implements IStockService {
  allStocks: StockModel[] = [];


  constructor(@InjectRepository(Stock)
              private stockRepository: Repository<Stock>,

  ){}

  async delete(id: string): Promise<void> {
    await this.stockRepository.delete({id: id});
    this.allStocks = this.allStocks.filter((s) => s.id !== id);
  }

  async getStocks(): Promise<StockModel[]> {
    const stocks = await this.stockRepository.find();
    const stockEntities: Stock[] = JSON.parse(JSON.stringify(stocks));
    return stockEntities;
  }

  async getStockId(id: string, stockName: string, initValue: number, currValue: number, description: string): Promise<Stock>{
    const stockDb = await this.stockRepository.findOne({
      stockName: stockName
    });
    return{
      id: stockDb.id,
        stockName: stockDb.stockName,
        initValue: stockDb.initValue,
        currValue: stockDb.currValue,
        description: stockDb.description,
    };
  }

  async update(id: string, stock: StockModel): Promise<StockModel> {
    await this.stockRepository.update(id, stock);
    const updatedStock = await this.stockRepository.findOne(id);
    if(updatedStock){
      return updatedStock;
    }
    else{
      throw new Error('stock not found');
    }
  }

  async newStock(id: string, stockModel: StockModel): Promise<StockModel> {
    const stockDb = await this.stockRepository.findOne({
      stockName: stockModel.stockName
    });
    if (!stockDb){
      let stock = this.stockRepository.create();
      stock.id = id;
      stock.stockName = stockModel.stockName;
      stock.initValue = stockModel.initValue;
      stock.currValue = stockModel.currValue;
      stock.description = stockModel.description;
      stock = await this.stockRepository.save(stock);
      return {
        id: '' + stock.id,
        stockName: stock.stockName,
        initValue: stock.initValue,
        currValue: stock.currValue,
        description: stock.description,
      };
    }
    if (stockDb.id === id){
      return{
        id: stockDb.id,
        stockName: stockDb.stockName,
        initValue: stockDb.initValue,
        currValue: stockDb.currValue,
        description: stockDb.description,
      };
    }else {
      throw new Error('Stock Already existo');
    }
  }


}
