export { default as awsConfig } from "./aws.config"
export { default as databaseConfig } from "./database.config"
import * as redisStore from "cache-manager-redis-store"

export const commonConfig = () => ({
  port: parseInt(process.env.PORT) || 4444,
  auth: {
    jwtSecret: process.env.JWT_SECRET
  },
  redis: {
    store: redisStore,
    host: process.env.REDIS_HOST || "redis",
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    ttl: parseInt(process.env.REDIS_TTL) || 28800
  },
  rabbitMQ: {
    options: {
      urls: [process.env.CLOUDAMQP_URL || "amqp://localhost:5672"],
      queue: "tasks_queue",
      queueOptions: {
        durable: false
      }
    }
  }
})
