import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Log, LogSchema } from "shared/schemas/log.schema"
import { LogsService } from "./logs.service"

@Module({
  providers: [LogsService],
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  exports: [LogsService]
})
export class LogsModule {}
