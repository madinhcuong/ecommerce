import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, SchemaTypes } from "mongoose"

export type FileDocument = File & Document

@Schema()
export class File {
  @Prop({ type: String, default: null })
  name: string // hinhconmeo.jpg

  @Prop({ type: String, default: null })
  key: string // media/1500x1500/hinhconmeo.jpg

  @Prop({ type: String, default: null })
  url: string // https://s3.com/media/1500x1500/hinhconmeo.jpg

  @Prop({ type: [String], enum: ["large", "medium", "small"] })
  sizes: string[]

  @Prop({ type: [SchemaTypes.Mixed], default: {} })
  data: any[] // [{ Bucket, ...}]

  @Prop({ type: Number, default: null })
  size: number // [{ Bucket, ...}] // bytes

  @Prop({ type: Date || Number, default: Date.now })
  created_at: Date | number

  @Prop({ type: Date || Number, default: Date.now })
  updated_at: Date | number
}

export const FileSchema = SchemaFactory.createForClass(File)
