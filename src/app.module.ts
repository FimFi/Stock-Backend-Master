import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './chat/infrastructure/database.module';
import * as Joi from "@hapi/joi";
import { StockModule } from "../../../Stock-Backend-Master/stock-backend-master/src/api/stock.module";

@Module({
  imports: [
    StockModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
