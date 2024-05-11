import { store } from '../store.js'
import { expenseService } from '../../services/expense.service.js'
import { SET_EXPENSES, SET_EXPENSE, REMOVE_EXPENSE, ADD_EXPENSE } from '../reducers/expense.reducer.js'

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

export async function removeExpense(expenseId) {
    try {
        await expenseService.remove(expenseId)
        store.dispatch({ type: REMOVE_EXPENSE, expenseId })
    } catch (err) {
        console.log('Cannot load expense', err)
        throw err
    }
}

export async function addExpense(expenseToAdd) {
    try {
        await expenseService.save(expenseToAdd)
        store.dispatch({ type: ADD_EXPENSE, expenseToAdd })
    } catch (err) {
        console.log('Cannot load expense', err)
        throw err
    }
}