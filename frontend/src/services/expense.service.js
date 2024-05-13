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
}

function getById(expenseId) {
    return httpService.get(STORAGE_KEY, expenseId)
}

async function remove(expenseId) {
    return httpService.delete(BASE_URL + expenseId)
}

async function save(expense) {
    if (expense._id) return httpService.put(BASE_URL + expense._id, expense)
    else return httpService.post(BASE_URL, expense)
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