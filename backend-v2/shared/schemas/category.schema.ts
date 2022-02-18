import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, ObjectId, Types } from "mongoose"

export type CategoryDocument = Category & Document

@Schema()
export class Category {
  @Prop({ type: String, index: true })
  root_name: string // default, amazon, ebay, walmart

  @Prop()
  name: string

  @Prop({ type: String, required: true, index: true })
  slug: string

  @Prop({ type: String, default: "" })
  description: string

  @Prop({ type: Types.ObjectId, ref: "Category" })
  parent: ObjectId

  @Prop({ type: [String], index: true })
  ancestors: string[]

  @Prop({ type: [String] })
  ancestors_name: string[]

  @Prop({ type: Number, default: 1 })
  level: number

  @Prop({ type: Boolean, default: false })
  has_children: number

  @Prop({ type: [{ code: String, value: String }] })
  custom_attributes: { _id: false; code: string; value: string }[] // attr_tax_code

  @Prop({ type: Date || Number, default: Date.now })
  created_at: Date | number

  @Prop({ type: Date || Number, default: Date.now })
  updated_at: Date | number
}

export const CategorySchema = SchemaFactory.createForClass(Category)
