import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { InjectModel } from "@nestjs/mongoose"
import { Order, OrderDocument } from "shared/schemas/order.schema"
import { Model } from "mongoose"

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject("ORDER_SERVICE") private client: ClientProxy
  ) {}

  async import(orderDto: any) {
    await this.client.emit("order-import", orderDto)
  }
}
