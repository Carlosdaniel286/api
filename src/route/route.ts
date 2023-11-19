import {  Router } from "express";
import * as homer from '../controller/controller'
import * as Post from '../controller/social'
import { authMiddleware } from "../middleware/authmiddleware";
export const router = Router()

router.post('/',homer.creatUsers)
router.get('/login',homer.signIn)
router.get('/token', authMiddleware, homer.CheckToken)
router.post('/post',authMiddleware,Post.publication)
router.post('/comment',authMiddleware,Post.Coments)

module.exports = router;