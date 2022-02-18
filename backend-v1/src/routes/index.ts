import express from "express";
const router = express.Router();

import CmsRouter from "./cms";
import StorefrontRouter from "./storefront";

router.use("/cms", CmsRouter);
router.use("/storefront", StorefrontRouter);

export default router;
