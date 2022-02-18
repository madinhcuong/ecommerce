import { Inject, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ClientProxy } from "@nestjs/microservices"
import { InjectModel } from "@nestjs/mongoose"
import { Product, ProductDocument } from "shared/schemas/product.schema"
import { Model } from "mongoose"

@Injectable()
export class ProductsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject("PRODUCT_SERVICE") private client: ClientProxy
  ) {}

  getPort() {
    return this.configService.get("port")
  }

  async create(createProductDto: any): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto)
    return createdProduct.save()
  }

  async import(productDto: any) {
    const data = [{ name: "Nuoc tuong" }]
    await this.client.emit("imports", data)
    return "Processing..."
  }
}
