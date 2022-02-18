import mongoose, { Document } from "mongoose"
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type } from "os"

export type WarehouseDocument = Warehouse & Document

@Schema()
export class Warehouse {
  @Prop({ default: false })
  is_main: boolean

  @Prop()
  priority: number

  @Prop()
  sales_tax: number

  @Prop()
  order_number_prefix: string

  @Prop()
  order_number: number

  @Prop({ index: true, sparse: true, unique: true })
  warehouse_code: string

  @Prop({
    type: {
      contact_name: { type: String },
      display_address: { type: String },
      address: { type: String, require: true },
      address2: { type: String },
      company_name: { type: String },
      email: { type: String, require: true },
      phone: { type: String, require: true },
      phone2: String,
      zip_code: String,
      country: { type: String, require: true },
      state: String,
      province: String,
      district: String,
      ward: String
    }
  })
  address: {
    contact_name: string
    display_address: string
    address: { type: string; require: true }
    address2: string
    company_name: string
    email: { type: string; require: true }
    phone: { type: string; require: true }
    phone2: string
    zip_code: string
    country: { type: string; require: true }
    state: string
    province: string
    district: string
    ward: string
  }

  @Prop({
    type: String,
    default: "active",
    enum: ["active", "inactive"],
    index: true
  })
  status_code: string

  @Prop({ type: Date || Number, default: Date.now, index: true })
  created_at: Date | number

  @Prop({ type: Date || Number, default: Date.now, index: true })
  updated_at: Date | number
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse)
