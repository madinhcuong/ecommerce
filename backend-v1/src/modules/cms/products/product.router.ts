import express from 'express';
import * as productController from "./product.controller";

// route
const router = express.Router();

router.route('/product')
    .get(productController.getProducts)
    .post(productController.createProduct)

export default router;