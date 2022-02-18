import { Warehouse } from "shared/schemas/warehouse.schema"
import mongoose, { Document, SchemaTypes } from "mongoose"
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose"

const { ObjectId, Mixed } = SchemaTypes

const ORDER_STATE = [
  "pending",
  "paid",
  "shipping",
  "processing",
  "delivered",
  "on_hold",
  "cancelled",
  "shipped",
  "refunded",
  "deleted",
  "ordered",
  "request_return",
  "oos",
  "fulfillment_error",
  "awaiting_payment",
  "awaiting_shipment"
]

const DROPSHIP_ORDER_STATE = [
  "pending",
  "cancelled",
  "shipped",
  "refunded",
  "oos",
  "request_return",
  "fulfillment_error",
  "ordered"
]

export type OrderDocument = Order & Document

@Schema()
export class Order {
  @Prop()
  order_number: string

  @Prop({ index: true })
  supplier_order_number: string

  @Prop({ index: true })
  shopify_order_id: string

  @Prop({ type: ObjectId, ref: "Warehouse" })
  warehouse: Warehouse

  @Prop()
  total_weight: number

  @Prop()
  shipping_methods: [
    {
      cost?: number
      weight?: number
      tracking_number?: string
      tracking_url?: string
    }
  ]

  @Prop({ type: Mixed })
  tax: any

  @Prop()
  discount: number

  @Prop()
  subtotal: number

  @Prop()
  grand_total: number

  @Prop()
  items_count: number

  @Prop()
  note: string

  @Prop()
  note_for_staff: string

  @Prop({ default: "awaiting_payment", index: true })
  status_code: string

  @Prop({ enum: DROPSHIP_ORDER_STATE, index: true })
  dropship_status_code: string

  @Prop({ enum: ORDER_STATE, index: true })
  status: string

  @Prop(
    raw({
      billing: Mixed,
      shipping: Mixed,
      billing_same_shipping: Boolean
    })
  )
  address: {
    billing?: any
    shipping?: any
    billing_same_shipping?: boolean
  }

  @Prop()
  items: [
    {
      name?: string
      thumbnail?: string
      sku?: string
      price?: number
      qty?: number
      row_total?: number
      unit_cost?: number
      warehouse?: Warehouse
    }
  ]

  @Prop(
    raw({
      method: String,
      method_id: String,
      method_value: Mixed,
      status: String,
      note: String,
      amount: Number,
      time: Date,
      data: Mixed
    })
  )
  payment: {
    method?: string
    method_id?: string
    method_value?: any
    status?: string
    note?: string
    amount?: number
    time?: Date
    data?: any
  }

  @Prop()
  ship_type: string

  @Prop()
  history: [
    {
      code?: string
      date?: Date
      noteAdmin?: string
    }
  ]

  @Prop({ type: Mixed })
  custom_attributes: any

  @Prop()
  ecomdash_id: number

  @Prop(
    raw({
      value: Number,
      units: String,
      WeightUnits: Number
    })
  )
  weight: {
    value?: number
    units?: string
    WeightUnits?: number
  }

  @Prop()
  store: string

  @Prop()
  marketplace_name: string

  @Prop()
  tags: string[]

  @Prop({ type: Date || Number, default: Date.now, index: true })
  created_at: Date | number

  @Prop({ type: Date || Number, default: Date.now, index: true })
  updated_at: Date | number
}

export const OrderSchema = SchemaFactory.createForClass(Order)

OrderSchema.index({ order_number: 1, store: 1 }, { unique: true })
