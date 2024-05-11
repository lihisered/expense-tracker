import { expenseService } from '../../services/expense.service.js'

export const SET_EXPENSES = 'SET_EXPENSES'
export const SET_EXPENSE = 'SET_EXPENSE'
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    expenses: [],
    expense: null,
    filterBy: expenseService.getDefaultFilter()
}

export function expenseReducer(state = initialState, action) {
    let newState = state
    let expenses
    switch (action.type) {
        case SET_EXPENSES:
            newState = { ...state, expenses: action.expenses }
            break
        case SET_EXPENSE:
            newState = { ...state, expense: action.expense }
            break
        case REMOVE_EXPENSE:
            expenses = state.expenses.filter(expense => expense._id !== action.expenseId)
            newState = { ...state, expenses }
            break
        case ADD_EXPENSE:
            newState = { ...state, expenses: [...state.expenses, action.expenseToAdd] }
            break
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }
        default:
            return state
    }
    return newState
}