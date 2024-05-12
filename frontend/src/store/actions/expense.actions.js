import { store } from '../store.js'
import { expenseService } from '../../services/expense.service.js'
import { SET_EXPENSES, SET_EXPENSE, REMOVE_EXPENSE, ADD_EXPENSE, UPDATE_EXPENSE } from '../reducers/expense.reducer.js'

export async function loadExpenses() {
    const { filterBy } = store.getState().expenseModule
    filterBy.userId = store.getState().userModule.loggedinUser?._id || ''
    try {
        const expenses = await expenseService.query(filterBy)
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

export async function saveExpense(expense) {
    const type = expense._id ? UPDATE_EXPENSE : ADD_EXPENSE
    try {
        const expenseToSave = await expenseService.save(expense)
        store.dispatch({ type, expense: expenseToSave })
        return expenseToSave
    } catch (err) {
        console.log('Cannot save expense', err)
        throw err
    }
}