import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Order, OrderDocument } from "shared/schemas/order.schema"
import { Model } from "mongoose"
import { LogsService } from "../logs/logs.service"
import { JobDto } from "./orders.dto"
import { WarehouseDocument, Warehouse } from "shared/schemas/warehouse.schema"

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Warehouse.name)
    private warehouseModel: Model<WarehouseDocument>,
    readonly logsService: LogsService
  ) {}
  async import(job: JobDto) {
    try {
      const { logId, data, regex, user } = job
      const counts = {
        total: data.length || 0,
        completed: 0,
        failed: 0
      }
      const success = []
      const errors = []

      for (const item of data) {
        const { isSuccess, order } = await this.getContentOrder(
          item,
          regex,
          user
        )
        if (!isSuccess) {
          // Error
          errors.push({ ...order, data: item })
          counts.failed += 1
          continue
        }
        success.push({ order_number: order.order_number })
      }
      // Save log
      if (logId) {
        await this.logsService.findByIdAndUpdate(logId, {
          color:
            success.length && errors.length
              ? "warning"
              : success.length
              ? "success"
              : "error",
          data: JSON.stringify(
            {
              counts,
              success,
              error: errors
            },
            undefined,
            2
          )
        })
      }

      console.log("Done - Import Order")
      return
    } catch (error) {
      console.log("import", error)
      throw error
    }
  }

  async getContentOrder(data, regex, user) {
    try {
      let order = null
      // check existing order
      if (data["Order ID AZ"]) {
        if (data["Source"])
          order = await this.orderModel.findOne({
            order_number: data["Order ID AZ"],
            store: data["Source"]
          })
        else
          order = await this.orderModel.findOne({
            order_number: data["Order ID AZ"]
          })
      }
      // if not exist, let create new order
      if (!order) return
      if (!order.custom_attributes) order.custom_attributes = {}
      // format data
      const fields = Object.keys(data)
      for (const field of fields) {
        switch (field.toLowerCase().replace(/ /g, "_")) {
          case "source":
            order.store = data[field]
            break
          case "asin":
            order.custom_attributes = {
              ...order.custom_attributes,
              asin: data[field] || ""
            }
            break
          case "status":
            const statusCode = data[field].toLowerCase().replace(/ /g, "_")
            order["dropship_status_code"] = statusCode
            break
          case "supplier_order_id":
            order.supplier_order_number = data[field] || ""
            const tag = "isDropship"
            if (data[field]) {
              if (order.tags && order.tags.length) {
                if (!order.tags.includes(tag)) order.tags.push(tag)
              } else order.tags.push(tag)
            } else if (order.tags.includes(tag)) {
              order.tags = order.tags.filter((_tag) => _tag === tag)
            }
            break
          case "purchase_cost":
            order.custom_attributes = {
              ...order.custom_attributes,
              purchase_cost: +data[field] || ""
            }
            break
          case "tracking_number":
            if (order.shipping_methods.length && data[field])
              order.shipping_methods[0].tracking_number = data[field]
            else if (data[field])
              order.shipping_methods.push({
                tracking_number: data[field] || ""
              })
            break
          case "latest_ship_date":
            order.custom_attributes = {
              ...order.custom_attributes,
              latest_ship_date: data[field] || ""
            }
            break
          case "source_url":
            order.custom_attributes = {
              ...order.custom_attributes,
              source_url: data[field] || ""
            }
            break
          case "bundle_quantity":
            order.custom_attributes = {
              ...order.custom_attributes,
              bundle_quantity: +data[field] || ""
            }
            break
          case "ship_to_information":
            const address = data[field].split(",")
            const zipCodeAndPhone = address[4]
            order.address = {
              shipping: {
                city: address[2],
                first_name: address[0],
                phone_number:
                  zipCodeAndPhone &&
                  zipCodeAndPhone.substring(
                    zipCodeAndPhone.lastIndexOf(":") + 1,
                    zipCodeAndPhone.length
                  ),
                state: address[3],
                street: address[1],
                zip_code:
                  zipCodeAndPhone &&
                  zipCodeAndPhone
                    .substring(0, zipCodeAndPhone.lastIndexOf("Phone number"))
                    .replace("\n", "")
                    .trim()
              }
            }
            break
          case "buyer_paid":
            order.grand_total = +data[field]
            break
          case "tax_collected":
            const taxCollected = +data[field] || 0
            const shippingTax = +data["Shipping Tax"] || 0
            const tax = taxCollected + shippingTax
            if (tax) order.tax = { total: tax }
            break
          case "base_price":
            order.subtotal = +data[field] || 0
            break
          case "shipping":
            if (order.shipping_methods.length)
              order.shipping_methods[0].cost = data[field]
            else order.shipping_methods.push({ cost: data[field] })
            break
          case "shipping_tax":
            order.custom_attributes = {
              ...order.custom_attributes,
              shipping_tax: +data[field] || ""
            }
            break
          case "notes":
            order.note_for_staff = data[field]
            break
          case "order_placed_by":
            order.custom_attributes = {
              ...order.custom_attributes,
              order_placed_by: data[field] || ""
            }
            break
          case "buyer_refund":
            order.custom_attributes = {
              ...order.custom_attributes,
              buyer_refund: +data[field] || ""
            }
            break
          case "supplier_refund":
            order.custom_attributes = {
              ...order.custom_attributes,
              supplier_refund: +data[field] || ""
            }
            break
          default:
            break
        }
      }
      order["history"].push({
        code: "order_get_from_OA",
        date: Date.now(),
        note: "Order get from OA",
        who_updated: user
          ? {
              id: user.sub,
              user_role: "admin",
              full_name: user["cognito:username"]
            }
          : {
              full_name: "System"
            }
      })
      await this.filterDropshipSKU(order, regex)
      await order.save()
      return { isSuccess: true, order }
    } catch (e) {
      console.log(e)
    }
  }

  async filterDropshipSKU(order, regex) {
    const warehouse = await this.warehouseModel.findOne({
      $or: [{ warehouse_code: "DR" }, { name: "Dropship" }]
    })
    if (order.supplier_order_number) order["ship_type"] = "dropship"
    if (order.items.length && warehouse) {
      for (const item of order.items) {
        if (regex.test(item.sku)) {
          item["warehouse"] = warehouse._id
          order["ship_type"] = "dropship"
        }
      }
    }
  }
}
