import { Controller } from "@nestjs/common"
import { EventPattern } from "@nestjs/microservices"
import { JobDto } from "./orders.dto"
import { OrdersService } from "./orders.service"
@Controller("orders")
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @EventPattern("order-import")
  async import(job: JobDto) {
    return this.orderService.import(job)
  }
}
