import { Controller } from "@nestjs/common"
import { EventPattern } from "@nestjs/microservices"
import { ProductsService } from "./products.service"
import { JobDto } from "./products.dto"

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @EventPattern("imports")
  async import(job: JobDto) {
    return this.productsService.import(job)
  }
}
