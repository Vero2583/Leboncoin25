import express from 'express'
import { getAnnonces } from '../controllers/annonce.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { create } from '../controllers/annonce.controller.js'
import { upload } from '../middlewares/upload.middleware.js'


const router = express.Router()

router.get('/', getAnnonces)
router.post('/', authMiddleware, upload.array('image', 5), create)






export default router 