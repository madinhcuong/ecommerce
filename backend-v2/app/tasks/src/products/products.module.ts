import { Module } from "@nestjs/common"
import { ProductsService } from "./products.service"
import { ProductsController } from "./products.controller"
import { BrandsModule } from "../brands/brands.module"
import { MongooseModule } from "@nestjs/mongoose"
import { Product, ProductSchema } from "shared/schemas/product.schema"
import { LogsModule } from "../logs/logs.module"

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    BrandsModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    LogsModule
  ]
})
export class ProductsModule {}
