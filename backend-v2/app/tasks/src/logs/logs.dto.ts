import { IsOptional } from "class-validator"

export class LogProductDto {
  @IsOptional()
  name?: string

  @IsOptional()
  color?: string

  @IsOptional()
  data?: any

  @IsOptional()
  user?: string

  @IsOptional()
  source_type?: string
}

export class UpdateLogDto extends LogProductDto {}
