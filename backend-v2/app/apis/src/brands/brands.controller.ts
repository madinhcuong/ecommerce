import { Controller, Get, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@UseGuards(AuthGuard("jwt"))
@Controller("brands")
export class BrandsController {
  @Get()
  public getHello() {
    return "hello"
  }
}
