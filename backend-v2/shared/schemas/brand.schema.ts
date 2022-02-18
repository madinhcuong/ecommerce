import mongoose, { Document } from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type BrandDocument = Brand & Document

@Schema()
export class Brand {
  @Prop()
  name: string

  @Prop({ unique: true, index: true })
  slug: string

  @Prop()
  name_lower: string

  @Prop()
  description: string

  @Prop()
  image: string

  @Prop({ default: "enable", index: true })
  status: string

  @Prop({ type: Date, default: Date.now })
  created_at: Date | number

  @Prop({ type: Date, default: Date.now })
  updated_at: Date | number
}

const BrandSchema = SchemaFactory.createForClass(Brand)

BrandSchema.pre<Brand>("save", function () {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[&\/\\#”“’;,+()$~%.'":*?<>{}]/g, "")
      .replace(/ /g, "-")
      .replace(/---/g, "-")
      .replace(/--/g, "-")
  }
})

export { BrandSchema }
