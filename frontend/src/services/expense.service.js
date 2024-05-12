import { storageService } from './async-storage.service'
import { httpService } from './http.service.js'

const BASE_URL = 'expense/'
const STORAGE_KEY = 'expense_db'

// _createExpenses()

export const expenseService = {
    query,
    getById,
    save,
    remove,
    getEmptyExpense,
    getCategories,
    getDefaultFilter
}

async function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
    // return await storageService.query(STORAGE_KEY)
}

function getById(expenseId) {
    return storageService.get(STORAGE_KEY, expenseId)
}

async function remove(expenseId) {
    return httpService.delete(BASE_URL + expenseId)
    // await storageService.remove(STORAGE_KEY, expenseId)
}

async function save(expense) {
    if (expense._id) return httpService.put(BASE_URL + expense._id, expense)
    // return await storageService.put(STORAGE_KEY, expense)
    else return httpService.post(BASE_URL, expense)
    // return await storageService.post(STORAGE_KEY, expense)
}

function getEmptyExpense() {
    return {
        userId: _makeId(),
        amount: '',
        category: '',
        date: Date.now(),
        notes: 'stam notes'
    }
}

function getCategories() {
    return [
        'Housing',
        'Utilities',
        'Transportation',
        'Food',
        'Healthcare',
        'Entertainment',
        'Education',
        'Personal Care'
    ]
}

function getDefaultFilter() {
    return { userId: '', categories: [], date: '' }
}

function _makeId(length = 9) {
    let txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

// function _createExpenses() {
//     const expensesData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
//     if (!expensesData || !expensesData.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
// }