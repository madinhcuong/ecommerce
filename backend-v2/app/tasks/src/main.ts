import { NestFactory } from "@nestjs/core"
import { TasksModule } from "./tasks.module"
import { ConfigService } from "@nestjs/config"
import { Transport, MicroserviceOptions } from "@nestjs/microservices"

async function bootstrap() {
  const app = await NestFactory.create(TasksModule)

  const configService = app.get(ConfigService)
  const options = configService.get("rabbitMQ.options")

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options
  })

  await app.startAllMicroservices()
}
bootstrap()
