import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"
import { MongooseModule } from "@nestjs/mongoose"
import { Order, OrderSchema } from "shared/schemas/order.schema"
import { LogsModule } from "../logs/logs.module"
import { Warehouse, WarehouseSchema } from "shared/schemas/warehouse.schema"

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema }
    ]),
    LogsModule
  ]
})
export class OrdersModule {}
