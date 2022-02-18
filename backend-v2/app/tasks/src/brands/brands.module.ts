import { Module } from "@nestjs/common"
import { BrandsService } from "./brands.service"
import { MongooseModule } from "@nestjs/mongoose"
import { Brand, BrandSchema } from "shared/schemas/brand.schema"

@Module({
  providers: [BrandsService],
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])
  ],
  exports: [BrandsService]
})
export class BrandsModule {}
