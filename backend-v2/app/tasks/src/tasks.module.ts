import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { TasksController } from "./tasks.controller"
import { TasksService } from "./tasks.service"
import { ProductsModule } from "./products/products.module"
import { BrandsModule } from "./brands/brands.module"

import { commonConfig, databaseConfig } from "shared/config"
import { LogsModule } from "./logs/logs.module"
import { OrdersModule } from "./orders/orders.module"
@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig, databaseConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database.uri")
      }),
      inject: [ConfigService]
    }),
    BrandsModule,
    ProductsModule,
    LogsModule,
    OrdersModule
  ]
})
export class TasksModule {}
