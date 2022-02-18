import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator"
import { Order } from "shared/schemas/order.schema"

export class JobDto {
  @IsNotEmpty()
  logId: string
  data: Order[]
  user: string | any

  @IsOptional()
  regex: string
}
