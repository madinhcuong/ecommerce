import { Body, Controller, Get, Post } from "@nestjs/common"
import { ProductsService } from "app/apis/src/products/products.service"

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getHello(): string {
    return this.productsService.getPort()
  }

  @Post()
  async create(@Body() createProductDto: any) {
    console.log("createProductDto", createProductDto)
    return this.productsService.create(createProductDto)
  }

  @Post("import")
  async import(@Body() productDto: any) {
    return this.productsService.import(productDto)
  }
}
