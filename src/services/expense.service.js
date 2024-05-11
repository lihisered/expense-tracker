import { storageService } from './async-storage.service'

const STORAGE_KEY = 'expense_db'

export const expenseService = {
    query,
    getById,
    save,
    remove,
    getEmptyExpense,
}

async function query() {
    return await storageService.query(STORAGE_KEY)
}

function getById(expenseId) {
    return storageService.get(STORAGE_KEY, expenseId)
}

async function remove(expenseId) {
    await storageService.remove(STORAGE_KEY, expenseId)
}

async function save(expense) {
    if (expense._id) {
        return await storageService.put(STORAGE_KEY, expense)
    } else {
        return await storageService.post(STORAGE_KEY, expense)
    }
}

function getEmptyExpense() {
    return {
        _id: _makeId(),
        userId: _makeId(),
        amount: '',
        category: '',
        date: Date.now(),
        notes: ''
    }
}

function _makeId(length = 9) {
    let txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}