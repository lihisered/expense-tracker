// import { createStore, combineReducers } from 'redux'
import { combineReducers, legacy_createStore as createStore } from 'redux'

import { expenceReducer } from './reducers/expense.reducer'

const rootReducer = combineReducers({
    expenceModule: expenceReducer
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)