import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Product, ProductDocument } from "shared/schemas/product.schema"
import { CreateProductDto, JobDto } from "./products.dto"
import { LogsService } from "app/tasks/src/logs/logs.service"

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    readonly logsService: LogsService
  ) {}

  async import(job: JobDto) {
    try {
      const { logId, user, data } = job
      const counts = {
        total: data.length || 0,
        completed: 0,
        failed: 0
      }
      const success = []
      const errors = []

      for (const item of data) {
        const oldProduct = await this.productModel
          .findOne({ sku: item.sku.toUpperCase() || "" })
          .exec()
        const result = await this.buildContentProduct(item)

        // Error
        if (!result.isSuccess) {
          errors.push({ ...result, data: item })
          counts.failed += 1
          continue
        }

        // Success
        if (result.product) {
          // Save log
          if (oldProduct) {
            await this.logsService.logUpdateProduct({
              name: "Import Product",
              color: "success",
              data: { change: { old: oldProduct, new: result.product } },
              user: user,
              source_type: "Admin"
            })
          } else {
            await this.logsService.logCreateProduct({
              name: "Import Product",
              color: "success",
              data: { add_new_product: result.product },
              user: user,
              source_type: "Admin"
            })
          }
          success.push(item)
          counts.completed += 1
        }
      }

      // Save log
      if (logId) {
        const log = await this.logsService.findById(
          logId,
          "-_id -created_at -__v"
        )
        if (!log) return
        if (success.length) log.color = "success"
        if (errors.length) log.color = "error"
        if (success.length && errors.length) log.color = "warning"
        let dataLog = null
        if (log.data) dataLog = JSON.parse(log.data)
        log.data = JSON.stringify(
          {
            counts,
            success,
            error: errors,
            jobType: dataLog?.jobType || ""
          },
          undefined,
          2
        )
        await this.logsService.findByIdAndUpdate(logId, log)
      }

      console.log("Done - Import product")
      return
    } catch (error) {
      console.log("import", error)
      throw error
    }
  }

  async buildContentProduct(data: CreateProductDto) {
    try {
      if (!data.sku || !data.name || !data.price) {
        return { message: "sku or name or price not found" }
      }

      const sku = data.sku.toUpperCase()
      let product = await this.productModel.findOne({ sku })
      if (!product) product = new this.productModel({ sku })

      const attributeFields = [
        "vendor",
        "recommended_condition",
        "amazon_condition",
        "preference_vendor_item",
        "invoice_id",
        "msrp_pricebook",
        "amazon_lowest_pricebook",
        "color",
        "size",
        "barcode"
      ]

      product.custom_attributes = product.custom_attributes || {}

      attributeFields.forEach((field) => {
        if (data[field]) {
          product.custom_attributes[
            field === "barcode" ? "barcode_input" : field
          ] = data[field]
        }
      })

      if (data.status) product.enable = data.status === "enable" ? true : false

      if (data.price) {
        const orginalPrice = parseFloat(data.price)
        product.price = +orginalPrice.toFixed(2)
        product.original_price = +orginalPrice.toFixed(2)
      }

      delete data.sku
      delete data.price
      delete data.status
      delete data.categories

      product.set(data)

      await product.save()

      return { isSuccess: true, product }
    } catch (error) {
      return {
        message: error.message,
        stack: error?.stack?.split("\n") || ""
      }
    }
  }
}
