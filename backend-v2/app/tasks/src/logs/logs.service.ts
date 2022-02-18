import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Log, LogDocument } from "shared/schemas/log.schema"
import { Model } from "mongoose"
import { LogProductDto, UpdateLogDto } from "./logs.dto"

const product_fields = [
  "asin",
  "barcode",
  "bin_location",
  "brand",
  "brand_id",
  "custom_attributes",
  "description",
  "height",
  "images",
  "length",
  "name",
  "notes",
  "original_price",
  "price",
  "product_type",
  "quantity",
  "short_description",
  "sku",
  "sku_walmart",
  "sold",
  "special_price",
  "status",
  "stock_availability",
  "tags",
  "unit_cost",
  "warehouses",
  "weight",
  "weight_in_ounce",
  "weight_unit",
  "width",
  "who_update"
]

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async findById(id: string, select: string): Promise<Log> {
    try {
      return await this.logModel.findById(id).select(select)
    } catch (error) {
      console.log("findById", error)
      throw error
    }
  }

  async findByIdAndUpdate(
    id: string,
    updateLogDto: UpdateLogDto
  ): Promise<Log> {
    try {
      return await this.logModel.findByIdAndUpdate(id, updateLogDto)
    } catch (error) {
      console.log("findById", error)
      throw error
    }
  }

  async logCreateProduct(logProductDto: LogProductDto): Promise<Log> {
    try {
      const { data } = logProductDto
      const new_product = {}
      const product = data["add_new_product"] || {}
      for (const field of product_fields) {
        new_product[field] = product[field]
      }
      new_product["_id"] = product["_id"] || ""

      delete data["add_new_product"]

      logProductDto.data = JSON.stringify(
        { add_new_product: new_product, ...data },
        undefined,
        2
      )

      const createLog = new this.logModel(logProductDto)
      return createLog.save()
    } catch (error) {
      console.log("logCreateProduct", error)
      throw error
    }
  }

  async logUpdateProduct(logProductDto: LogProductDto) {
    try {
      const { data } = logProductDto
      const { change } = data
      const old_product = change.old.toJSON()
      const new_product = change.new

      const _old = {}
      const _new = {}
      for (const field of product_fields) {
        const old_data = old_product[field]
        const new_data = new_product[field]

        if (JSON.stringify(old_data) === JSON.stringify(new_data)) continue

        // Check User Update
        if (field === "who_update") {
          const old_who_update = old_data
          const new_who_update = new_data
          if (
            old_who_update &&
            new_who_update &&
            new_who_update._id &&
            `${old_who_update}` === `${new_who_update._id}`
          ) {
            continue
          }
        }

        // Check Image
        if (field === "images") {
          const old_images = old_data
          const new_images = new_data

          const imageIds = []
          for (const image of new_images) {
            if (image._id) imageIds.push(image._id)
          }
          if (JSON.stringify(old_images) === JSON.stringify(imageIds)) continue

          _old[field] = old_data
          _new[field] = imageIds
          continue
        }

        // Check Custom Attributes
        if (field === "custom_attributes" && old_data) {
          const field_custom_attributes = Object.keys(old_data)
          for (const field_custom_attribute of field_custom_attributes) {
            const old_custom_attribute = old_data[field_custom_attribute]
            const new_custom_attribute = new_data[field_custom_attribute]

            if (
              JSON.stringify(old_custom_attribute) ===
              JSON.stringify(new_custom_attribute)
            )
              continue

            _old[`${field}.${field_custom_attribute}`] = old_custom_attribute
            _new[`${field}.${field_custom_attribute}`] = new_custom_attribute
            continue
          }
          continue
        }

        _old[field] = old_data
        _new[field] = new_data
      }

      if (
        (Object.keys(_old).length === 0 && _old.constructor === Object) ||
        (Object.keys(_new).length === 0 && _new.constructor === Object)
      ) {
        return
      }

      const product = {
        _id: new_product["_id"] || old_product["_id"] || null,
        name: new_product["name"] || old_product["name"] || null,
        sku: new_product["sku"] || old_product["sku"] || null
      }

      delete data["change"]

      logProductDto.data = JSON.stringify(
        { product, change: { old: _old, new: _new }, ...data },
        undefined,
        2
      )

      const createLog = new this.logModel(logProductDto)
      return createLog.save()
    } catch (error) {
      console.log("logCreateProduct", error)
      throw error
    }
  }
}
