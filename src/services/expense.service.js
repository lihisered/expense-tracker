import { storageService } from './async-storage.service'

const STORAGE_KEY = 'expense_db'

const expenses = [
    {
        _id: 1023,
        userId: 5001,
        amount: 1200.00,
        category: "Housing",
        date: new Date("2024-01-15").getTime() / 1000,
        notes: "Rent for January"
    },
    {
        _id: 1024,
        userId: 5002,
        amount: 150.00,
        category: "Utilities",
        date: new Date("2024-02-10").getTime() / 1000,
        notes: "Electricity bill"
    },
    {
        _id: 1025,
        userId: 5003,
        amount: 60.00,
        category: "Transportation",
        date: new Date("2024-03-05").getTime() / 1000,
        notes: "Gas refill"
    },
    {
        _id: 1026,
        userId: 5004,
        amount: 200.00,
        category: "Food",
        date: new Date("2024-01-22").getTime() / 1000,
        notes: "Grocery shopping"
    },
    {
        _id: 1027,
        userId: 5005,
        amount: 300.00,
        category: "Healthcare",
        date: new Date("2024-02-15").getTime() / 1000,
        notes: "Dental appointment"
    },
    {
        _id: 1028,
        userId: 5006,
        amount: 250.00,
        category: "Entertainment",
        date: new Date("2024-03-18").getTime() / 1000,
        notes: "Concert tickets"
    },
    {
        _id: 1029,
        userId: 5007,
        amount: 500.00,
        category: "Education",
        date: new Date("2024-01-30").getTime() / 1000,
        notes: "Semester textbooks"
    },
    {
        _id: 1030,
        userId: 5008,
        amount: 75.00,
        category: "Personal Care",
        date: new Date("2024-02-20").getTime() / 1000,
        notes: "Hair salon visit"
    },
    {
        _id: 1031,
        userId: 5009,
        amount: 110.00,
        category: "Transportation",
        date: new Date("2024-01-10").getTime() / 1000,
        notes: "Public transport card reload"
    },
    {
        _id: 1032,
        userId: 5010,
        amount: 450.00,
        category: "Education",
        date: new Date("2024-03-22").getTime() / 1000,
        notes: "Online course enrollment"
    }
]

_createExpenses()

export const expenseService = {
    query,
    getById,
    save,
    remove,
    getEmptyExpense,
    getCategories,
    getDefaultFilter
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

function _createExpenses() {
    const expensesData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    if (!expensesData || !expensesData.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}