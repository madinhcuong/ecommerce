import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientProxyFactory, Transport } from "@nestjs/microservices"
import { MongooseModule } from "@nestjs/mongoose"
import { ProductsService } from "./products.service"
import { ProductsController } from "./products.controller"
import { Product, ProductSchema } from "shared/schemas/product.schema"
import { BrandsModule } from "app/apis/src/brands/brands.module"

@Module({
  providers: [
    ProductsService,
    {
      provide: "PRODUCT_SERVICE",
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
  controllers: [ProductsController],
  imports: [
    ConfigModule,
    BrandsModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ]
})
export class ProductsModule {}
