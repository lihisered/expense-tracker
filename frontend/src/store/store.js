// import { createStore, combineReducers } from 'redux'
import { combineReducers, legacy_createStore as createStore } from 'redux'

import { expenseReducer } from './reducers/expense.reducer'

const rootReducer = combineReducers({
    expenseModule: expenseReducer
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)