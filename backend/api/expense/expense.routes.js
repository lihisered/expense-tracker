import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getExpenses, getExpenseById, addExpense, removeExpense, updateExpense } from './expense.controller.js'

const router = express.Router()

router.get('/', log, requireAuth, getExpenses)
router.get('/:id', getExpenseById)
router.post('/', requireAuth, addExpense)
router.put('/:id', requireAuth, updateExpense)
router.delete('/:id', requireAuth, removeExpense)

export const expenseRoutes = router
