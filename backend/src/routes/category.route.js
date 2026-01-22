import express from 'express'
import { createCategory, deleteCategoryByid, getCategories, getcategoryById, updatecategoryById } from '../controllers/category.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'


const router = express.Router()

router.get('/', getCategories)
router.post('/', authMiddleware, createCategory)
router.get('/:id', getcategoryById)
router.put('/:id', authMiddleware, updatecategoryById)
router.delete('/:id', authMiddleware, deleteCategoryByid)








export default router