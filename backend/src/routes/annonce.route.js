import express from 'express'
import { create, getAnnonces, updateAnnonceById, getById, deleteById } from '../controllers/annonce.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'


const router = express.Router()

router.get('/', getAnnonces)
router.post('/', authMiddleware, upload.array('image', 5), create)
router.get('/:id', getById)
router.put('/:id', upload.array('image', 5), updateAnnonceById)
router.delete('/:id', authMiddleware, deleteById)






export default router 