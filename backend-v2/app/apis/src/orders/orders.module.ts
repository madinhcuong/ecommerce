import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientProxyFactory, Transport } from "@nestjs/microservices"
import { MongooseModule } from "@nestjs/mongoose"
import { Order, OrderSchema } from "shared/schemas/order.schema"

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: "ORDER_SERVICE",
      useFactory: (config: ConfigService) => {
        const options = config.get("rabbitMQ.options")
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options
        })
      },
      inject: [ConfigService]
    }
  ],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])
  ]
})
export class OrdersModule {}
