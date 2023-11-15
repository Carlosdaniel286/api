import {  Router } from "express";
import * as homer from '../controller/controller'

export const router = Router()

router.post('/',homer.creatUsers)
router.get('/login',homer.signIn)

module.exports = router;