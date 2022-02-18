import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { awsConfig, commonConfig, databaseConfig } from "shared/config"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProductsModule } from "./products/products.module"
import { BrandsModule } from "./brands/brands.module"
import { OrdersModule } from "./orders/orders.module"

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig, databaseConfig, awsConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database.uri")
      }),
      inject: [ConfigService]
    }),
    ProductsModule,
    BrandsModule,
    OrdersModule
  ]
})
export class AppModule {}
