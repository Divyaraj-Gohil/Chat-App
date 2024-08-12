import express from "express";
import { getotheruser, login, logout, register } from "../controller/user.controller.js";
import Authenticated from "../middlewares/Authenticated.js";

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/getOtherUser').get(Authenticated, getotheruser)

export default router
