import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getExpenses, getExpenseById, addExpense, removeExpense, updateExpense } from './expense.controller.js'

const router = express.Router()

router.get('/', log, getExpenses)
router.get('/:id', getExpenseById)
router.post('/', addExpense)
router.put('/:id', updateExpense)
router.delete('/:id', removeExpense)

export const expenseRoutes = router
