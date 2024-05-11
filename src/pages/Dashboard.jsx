import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ExpenseList } from '../cmps/ExpenseList'
import { ExpenseFilter } from '../cmps/ExpenseFilter'
import { Chart } from '../cmps/Chart'

import { expenseService } from '../services/expense.service'

import { loadExpenses, removeExpense, addExpense } from '../store/actions/expense.actions'

export function Dashboard() {

    const dispatch = useDispatch()

    const filterBy = useSelector(storeState => storeState.expenseModule.filterBy)
    const expenses = useSelector(storeState => storeState.expenseModule.expenses)

    const [emptyExpense, setEmptyExpense] = useState(expenseService.getEmptyExpense())

    useEffect(() => {
        async function fetchData() {
            try {
                await loadExpenses()
            } catch (err) {
                console.log('Cannot load expenses', err)
            }
        }
        fetchData()
    }, [])

    async function onRemoveExpense(expenseId) {
        try {
            await removeExpense(expenseId)
        } catch (err) {
            console.log('Cannot remove expense', expenseId, err)
        }
    }

    async function onAddExpense() {
        const amount = +prompt('Expense amount?')
        const category = prompt('Expense category?')
        const expenseToAdd = { ...emptyExpense, amount, category }

        try {
            await addExpense(expenseToAdd)
        } catch (err) {
            console.log('Cannot add expense', expenseToAdd, err)
        }
    }

    function onSetFilter(filterBy) {
        console.log(filterBy)
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }

    return (
        <main className="main-app">
            {/* <pre>{JSON.stringify(expenses, null, 2)}</pre> */}
            <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <ExpenseList expenses={expenses} onRemoveExpense={onRemoveExpense} />
            <Chart />

            {/* <button onClick={onAddExpense}>Add Expense!</button> */}
        </main>
    )
}