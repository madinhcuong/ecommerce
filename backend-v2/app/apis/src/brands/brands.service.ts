import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Brand, BrandDocument } from "shared/schemas/brand.schema"
import { Model } from "mongoose"
import { CreateBrandDto } from "app/apis/src/brands/dtos"
@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const createdBrand = new this.brandModel(createBrandDto)
    return createdBrand.save()
  }

  async getBySlug(slug: string): Promise<Brand> {
    return this.brandModel.findOne({ slug }).exec()
  }
}
