import {  Router } from "express";
import * as homer from '../controller/controller'
import { authMiddleware } from "../middleware/authmiddleware";
export const router = Router()

router.post('/',homer.creatUsers)
router.get('/login',homer.signIn)
router.get('/token', authMiddleware, homer.CheckToken)

module.exports = router;