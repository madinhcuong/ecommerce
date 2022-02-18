// import redis from "redis";
// const { REDIS_PORT } = process.env;
// const port = REDIS_PORT ? +REDIS_PORT : 6379;
// const client = redis.createClient(port);

// client.on("connect", function () {
//   console.log("[Redis] connected");
// });
// client.on("error", (err) => {
//   console.log("[Redis] Error " + err);
// });

// export const setCache = async (key: string, value: any) => {
//   await client.set(key, JSON.stringify(value));
// };

// export const getCache = async (key: string) => {
//   return new Promise((resolve) => {
//     client.get(key, (err, result: any) => {
//       if (err) resolve(null);
//       resolve(JSON.parse(result));
//     });
//   });
// };
