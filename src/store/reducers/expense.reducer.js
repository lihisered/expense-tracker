export const SET_EXPENSES = 'SET_EXPENSES'
export const SET_EXPENSE = 'SET_EXPENSE'

const initialState = {
    expenses: [],
    expense: null,
}

export function expenceReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case SET_EXPENSES:
            newState = { ...state, expenses: action.expenses }
            break
        case SET_EXPENSE:
            newState = { ...state, expense: action.expense }
            break
        default:
            return state
    }
    return newState
}