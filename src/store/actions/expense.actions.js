import { store } from '../store/store'
import { SET_EXPENSES, SET_EXPENSE } from './Expense.reducer'

export async function loadExpenses() {
    try {
        const expenses = await expenseService.query()
        store.dispatch({ type: SET_EXPENSES, expenses })
    } catch (err) {
        console.log('Cannot load expenses', err)
        throw err
    }
}

export async function loadExpense(expenseId) {
    try {
        const expense = await expenseService.getById(expenseId)
        store.dispatch({ type: SET_EXPENSE, expense })
    } catch (err) {
        console.log('Cannot load expense', err)
        throw err
    }
}