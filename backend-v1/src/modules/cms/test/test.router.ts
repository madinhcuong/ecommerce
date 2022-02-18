import express from "express";
import { Create } from "./test.interface";
import * as testController from "./test.controller";
import { validator } from "../../../middlewares";

// route
const router = express.Router();
router.route("/test").post(validator(Create), testController.getProducts);

export default router;
