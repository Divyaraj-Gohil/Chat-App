import express from 'express'
import { getmessage, sendmessage } from '../controller/message.controller.js'
import Authenticated from '../middlewares/Authenticated.js'

const router = express.Router()

router.route('/send/:id').post(Authenticated, sendmessage)
router.route('/:id').get(Authenticated, getmessage)

export default router