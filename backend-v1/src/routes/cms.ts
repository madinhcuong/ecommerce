import express from "express";
const router = express.Router();

import User from "../modules/cms/user/user.router";
import Product from "../modules/cms/products/product.router";
import ConfigData from "../modules/cms/configData/configData.router";
import Test from "../modules/cms/test/test.router";

router.use("/", [User, Product, ConfigData, Test]);

export default router;
