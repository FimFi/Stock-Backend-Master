import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Inject } from '@nestjs/common';
import {IStockService, IStockServiceProvider} from "../../core/primary-ports/stock.service.interface";
import { Socket } from 'socket.io';
import {StockDto} from "../dtos/stocks.dto";
import {StockModel} from "../../core/models/stock.model";


@WebSocketGateway()
export class StockGateway {
  constructor(
    @Inject(IStockServiceProvider) private stockService: IStockService,

  ) {

  }

  @WebSocketServer() server;

  @SubscribeMessage('stock')
  async handleStockEvent(
    @MessageBody() stockModel: StockModel,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    try {
      const stockClient = await this.stockService.newStock(
        socket.id,
        stockModel
      );
      const stocks = await this.stockService.getStocks();
      const stockDto: StockDto ={
        DTOStocks: stocks,
        Stock: stockClient,
      };
      socket.emit('stockDto', stockDto);
      this.server.emit('stocks', stocks);
      console.log('stocks: ', stocks)
    } catch (e) {
      console.log('e', e);
    }
  }

  @SubscribeMessage('updateStock')
  async handleUpdateStockEvent(
      @MessageBody() stockModel: StockModel,
      @ConnectedSocket() stock: Socket,
  ): Promise<void>{
    try{
      console.log('', stockModel);
      const stockUpdate = await this.stockService.update(stockModel.id, stockModel);
      const stocks = await this.stockService.getStocks();
      const stockDTO: StockDto = {
        DTOStocks: stocks,
        Stock: stockUpdate
      };
      stock.emit('stockDTO', stockDTO);
      this.server.emit('stocks', stocks);
    }catch(e){
      console.log('Error', e);
    }
  }

  @SubscribeMessage('welcomeStock')
  async handleWelcomeStockEvent(
      @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const stocks = await this.stockService.getStocks();
      socket.emit('stocks', stocks);
    console.log('stocks: ', stocks)

  }


}
