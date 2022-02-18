import express from 'express';
import * as userController from "./user.controller";

// route
const router = express.Router();
router.get('/user', userController.getListUsers);


export default router;