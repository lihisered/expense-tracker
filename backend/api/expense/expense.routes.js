import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getExpenses, getExpenseById, addExpense, removeExpense } from './expense.controller.js'

const router = express.Router()

router.get('/', log, getExpenses)
router.get('/:id', getExpenseById)
router.post('/', requireAuth, addExpense)
router.delete('/:id', requireAuth, removeExpense)

export const expenseRoutes = router
