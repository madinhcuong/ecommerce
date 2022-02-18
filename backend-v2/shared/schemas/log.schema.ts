import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, ObjectId, Types } from "mongoose"

export type LogDocument = Log & Document

@Schema()
export class Log {
  @Prop({ type: String, default: null })
  name: string

  @Prop({
    type: String,
    enum: [
      "success",
      "danger",
      "primary",
      "warning",
      "none",
      "default",
      "secondary",
      "error"
    ],
    default: "none"
  })
  color: string

  @Prop()
  data: string // JSON.stringify

  @Prop({
    type: Types.ObjectId,
    refPath: "source_type",
    index: true,
    default: null
  })
  source: ObjectId

  @Prop({
    type: String,
    index: true,
    enum: [
      "QueueJob",
      "Queue",
      "Admin",
      "Customer",
      "Product",
      "Order",
      "JobV4",
      null
    ]
  })
  source_type: string

  @Prop({ type: String, index: true })
  user: string

  @Prop({ type: Date || Number, default: Date.now })
  created_at: Date | number
}

export const LogSchema = SchemaFactory.createForClass(Log)
