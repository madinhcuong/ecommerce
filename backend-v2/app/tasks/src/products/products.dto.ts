import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  sku: string

  @IsString()
  @IsNotEmpty()
  vendor: string

  @IsString()
  @IsNotEmpty()
  recommended_condition: string

  @IsString()
  @IsNotEmpty()
  amazon_condition: string

  @IsNumber()
  @IsNotEmpty()
  barcode: number

  @IsNumber()
  @IsNotEmpty()
  preference_vendor_item: number

  @IsNumber()
  @IsNotEmpty()
  invoice_id: number

  @IsString()
  @IsNotEmpty()
  price: string

  @IsNumber()
  @IsNotEmpty()
  msrp_pricebook: number

  @IsNumber()
  @IsNotEmpty()
  amazon_lowest_pricebook: number

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  categories: string

  @IsString()
  @IsNotEmpty()
  brand: string

  @IsNumber()
  @IsNotEmpty()
  width: number

  @IsNumber()
  @IsNotEmpty()
  length: number

  @IsNumber()
  @IsNotEmpty()
  weight: number

  @IsString()
  @IsNotEmpty()
  weight_unit: string

  @IsNumber()
  @IsNotEmpty()
  height: number

  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsNumber()
  @IsNotEmpty()
  unit_cost: number

  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsNotEmpty()
  color: string

  @IsString()
  @IsNotEmpty()
  size: string
}

export class JobDto {
  @IsString()
  @IsNotEmpty()
  logId: string

  @IsString()
  @IsNotEmpty()
  user: string

  @IsNotEmpty()
  data: CreateProductDto[]
}
