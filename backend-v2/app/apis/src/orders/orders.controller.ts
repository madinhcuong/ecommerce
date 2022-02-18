import { Body, Controller, Get, Post } from "@nestjs/common"
import { OrdersService } from "./orders.service"

@Controller("orders")
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post("import")
  async import(@Body() orderDto) {
    return this.ordersService.import(orderDto)
  }
}
