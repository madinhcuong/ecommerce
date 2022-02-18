require("dotenv").config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import path from "path";
import { env } from "./config";
import { apiAuthenticator } from "./middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (!env.isProduction) {
  app.use(morgan("dev"));
}

// connect database
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("[Postgresql] Successfully connected to the database");
//   })
//   .catch((err: any) => {
//     console.log(
//       "[Postgresql] Could not connect to the database. Exiting now...",
//       err?.message || null
//     );
//   });

// Api
app.use(`/api/${env.apiVersion}`, routes);

//--- static file
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//-- View
// app.use(express.static(path.join(__dirname, "views/storefront/")));
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views/storefront/index.html"));
// });

app.use((req: Request, Response: Response, next: NextFunction) => {
  const error: any = new Error();
  error.status = 404;
  error.message = "NOT_FOUND_ROUTE";
  error.name = "NotFoundException";
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  return res.json({
    message: err.name ? err.name : "Unknown error",
    errors: [
      {
        message: err.message ? err.message : "Unknown error",
      },
    ],
    status: err.status,
  });
});

// import database
// import "./seeds";

// Start the server
const port = Number(env.port || 5000);
app.listen(port, () => {
  console.log(
    `[HTTP] Server listening in port ${port} => http://localhost:${port}`
  );
});
