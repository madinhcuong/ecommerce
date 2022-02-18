import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from "mongoose"
import { Document, ObjectId, Types, SchemaTypes } from "mongoose"
import { Brand, BrandDocument, BrandSchema } from "shared/schemas/brand.schema"
import { File } from "shared/schemas/file.schema"
import { Warehouse } from "shared/schemas/warehouse.schema"
import { Category } from "shared/schemas/category.schema"

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop()
  name: string

  @Prop({ unique: true, index: true })
  sku: string

  @Prop()
  sku_walmart: string

  @Prop({ default: "" })
  asin: string

  @Prop({ unique: true, index: true })
  barcode: string

  @Prop({ required: true })
  price: number

  @Prop()
  original_price: number

  @Prop()
  tax_class: string

  @Prop({ default: 0 })
  weight: number

  @Prop()
  weight_in_ounce: number

  @Prop()
  weight_unit: string

  @Prop({ required: true })
  length: string

  @Prop({ required: true })
  width: string

  @Prop({ required: true })
  height: string

  @Prop({ type: SchemaTypes.Mixed, default: "" })
  customize_options: any

  @Prop({ type: SchemaTypes.Mixed, default: "" })
  description: any

  @Prop({ type: SchemaTypes.Mixed, default: "" })
  short_description: any

  @Prop({ default: false })
  sell_on_pos: boolean

  @Prop({ type: [String], default: [] })
  category_keywords: string[]

  @Prop({ type: Types.ObjectId, ref: "Category" })
  categories: Category

  @Prop({ type: Types.ObjectId, ref: "Brand", default: null })
  brand_id: Brand

  @Prop()
  brand: string

  @Prop({ type: [{ type: Types.ObjectId, ref: "File" }] })
  images: File[]

  @Prop({ index: true })
  quantity: number

  @Prop({
    type: [
      {
        warehouse: { type: Types.ObjectId, ref: "Warehouse" },
        quantity: { type: Number, default: 0 },
        bin: String,
        aisle: String,
        priority: { type: Number, default: 0 }
      }
    ]
  })
  warehouses: {
    _id: false
    warehouse: Warehouse
    quantity: number
    bin: string
    aisle: string
    priority: number
  }[]

  @Prop({ default: "out-of-stock" })
  stock_availability: string

  @Prop({
    type: {
      processed: { type: Boolean, default: false, index: true },
      listed: { type: Boolean, default: false, index: true },
      bin: { type: Boolean, default: false, index: true }
    }
  })
  status: {
    processed: boolean
    listed: boolean
    bin: boolean
  }

  @Prop({ default: true, index: true })
  enable: boolean

  @Prop([String])
  tags: string[]

  @Prop({
    type: {
      avg: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    }
  })
  rating: {
    avg: number
    count: number
  }

  @Prop({
    type: [
      {
        name: { type: String, default: "" },
        values: { type: [String], default: [] }
      }
    ]
  })
  options: {
    name: string
    values: string[]
  }[]

  @Prop({ type: String })
  author: string

  @Prop({ type: String })
  who_update: string

  @Prop()
  created_by: string

  @Prop()
  last_updated_by: string

  @Prop({
    type: String,
    default: "simple",
    enum: ["simple", "configurable", "downloadable", "kit_product"]
  })
  product_type: string

  @Prop({ type: Boolean, default: true })
  is_physical: boolean

  @Prop({
    type: [
      {
        title: String,
        option_type: String,
        required: Boolean,
        options: {
          type: [
            {
              title: String,
              description: String,
              images: [String],
              price: Number,
              price_type: String
            }
          ]
        }
      }
    ]
  })
  customizable_options: {
    title: string
    option_type: string // dropdown, text field, checkbox
    required: boolean
    options: {
      title: string
      description: string
      images: string[]
      price: number
      price_type: string // Fixed or percent
    }[]
  }[]

  @Prop({
    type: {
      region: { type: String, default: "us" },
      is_dropship: { type: Boolean, default: false },
      source_name: String,
      source_url: String,
      source_id: Types.ObjectId,
      created_at: { type: Date, default: Date.now, index: true },
      updated_at: { type: Date, default: Date.now, index: true }
    }
  })
  dropship: {
    region: string
    is_dropship: boolean // if this product is dropship type
    source_name: string // shop name, such as: amazon_com/amazon_jp/ebay/walmart
    source_url: string // url product on Amazon
    source_id: ObjectId // id of original product (tulysa)
    created_at: Date
    updated_at: Date // when cron updated price for this product from source url
  }

  @Prop({ type: SchemaTypes.Mixed })
  custom_attributes: any

  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
      }
    ]
  })
  kit_components: {
    _id: false
    product: Product
    quantity: number
  }[]

  @Prop({ type: Types.ObjectId, ref: "Product", default: null })
  kit_primary: Product

  @Prop()
  bin_location: string

  @Prop()
  unit_cost: number

  @Prop()
  shopify_product_id: string

  @Prop()
  shopify_variant_id: string

  @Prop()
  shopify_hash: string

  @Prop({ type: Number, default: 0 })
  sold: number

  @Prop({
    type: [
      {
        code: { type: String, enum: ["amazon", "ecomdash", "ebay"] },
        status: String
      }
    ]
  })
  listing: {
    code: string // ecomdash, ebay, amazon
    status: string // pending, completed(push already)
  }[]

  @Prop()
  notes: string

  @Prop({ type: Date || Number, default: Date.now, index: true })
  created_at: Date | number

  @Prop({ type: Date || Number, default: Date.now, index: true })
  updated_at: Date | number
}

const ProductSchema = SchemaFactory.createForClass(Product)

ProductSchema.pre<Product>("save", async function () {
  mongoose.connect(process.env.MONGODB_URI)
  const BrandModel: mongoose.Model<BrandDocument> = mongoose.model(
    Brand.name,
    BrandSchema
  ) as any
  if (this.brand) {
    const brandSlug = this.brand
      .toLowerCase()
      .replace(/[&\\/\\#”“’;,+()$~%.'":*?<>{}]/g, "")
      .replace(/ /g, "-")
      .replace(/---/g, "-")
      .replace(/--/g, "-")

    let brand = await BrandModel.findOne({ slug: brandSlug })
    if (!brand) {
      try {
        brand = new BrandModel({ name: this.brand, slug: brandSlug })
        await brand.save()
        this.brand_id = brand._id
      } catch (error) {
        console.log("error", error.message)
      }
    } else {
      this.brand_id = brand._id
    }
  }

  if (this.sku) {
    this.sku_walmart = this.sku
      .trim()
      .toUpperCase()
      .replace(/[&-\s/\\#""';,+()$~%.'":*?<>{}@!^`=_]/g, "")
      .replace(/ /g, "-")
      .replace(/---/g, "-")
      .replace(/--/g, "-")
  }

  if (!this.original_price || this.original_price === undefined) {
    this.original_price = this.price
  }

  // improve product name
  if (this.name) {
    this.name = this.name.replace(/&quot;/g, '"').replace(/&amp;/g, "&")
  }

  // calculate quantity from warehouses
  this.quantity = 0
  if (Array.isArray(this.warehouses) && this.warehouses.length > 0) {
    this.warehouses = this.warehouses.filter((w) => !!w.warehouse)
    for (const warehouse of this.warehouses) {
      this.quantity += warehouse.quantity || 0
    }
  }

  // if (this.product_type === "kit_product") {
  //   const Product = this.constructor
  //   const arrayComponentId = this.kit_components.map((kit) => kit.product)
  //   const componentsData = await Product.find({
  //     _id: { $in: arrayComponentId }
  //   })
  //     .select("_id quantity")
  //     .lean()
  //   componentsData.forEach((component) => {
  //     const componentItem = this.kit_components.find((kit) => {
  //       return kit.product.toString() === component._id.toString()
  //     })
  //     if (componentItem) {
  //       const quantityItem = Math.floor(
  //         component.quantity / componentItem.quantity
  //       )
  //       if (this.quantity == 0) this.quantity = quantityItem
  //       else if (this.quantity > 0 && this.quantity > quantityItem)
  //         this.quantity = quantityItem
  //     }
  //   })
  // }

  // if (Array.isArray(this.imagesTemporary)) {
  //   const slug = slugify(this.name, true)
  //   const fileIds = await handleProductImgs(
  //     this.imagesTemporary,
  //     this.images,
  //     slug
  //   )
  //   if (Array.isArray(fileIds) && fileIds.length) this.images = fileIds
  //   else this.images = []
  //   delete this.imagesTemporary
  // }

  if (!Array.isArray(this.images) || this.images.length === 0)
    this.enable = false

  this.stock_availability = "in-stock"
  if (this.quantity <= 0) this.stock_availability = "out-of-stock"

  this.is_physical = this.product_type === "simple"
})

export { ProductSchema }
