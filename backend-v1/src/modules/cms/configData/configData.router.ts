import express from 'express';
import UserController from "./configData.controller";

// route
const router = express.Router();
router.get('/config-data', UserController.getListUsers);


export default router;