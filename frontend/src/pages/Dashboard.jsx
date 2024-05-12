import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ExpenseList } from '../cmps/ExpenseList'
import { ExpenseFilter } from '../cmps/ExpenseFilter'
import { ExpenseAdd } from '../cmps/ExpenseAdd'
import { Chart } from '../cmps/Chart'

import { expenseService } from '../services/expense.service'

import { loadExpenses, removeExpense, saveExpense } from '../store/actions/expense.actions'

export function Dashboard() {

    const dispatch = useDispatch()

    const filterBy = useSelector(storeState => storeState.expenseModule.filterBy)
    const expenses = useSelector(storeState => storeState.expenseModule.expenses)

    const [modalOpen, setModalOpen] = useState(false)
    const [currExpense, setCurrExpense] = useState(null)
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
    }, [filterBy])

    async function onRemoveExpense(expenseId) {
        try {
            await removeExpense(expenseId)
        } catch (err) {
            console.log('Cannot remove expense', expenseId, err)
        }
    }

    function onSetFilter(filterBy) {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }

    function handleOpenModal(expense) {
        setCurrExpense(expense)
        setModalOpen(true)
    }

    function handleCloseModal() {
        setCurrExpense(null)
        setModalOpen(false)
    }

    function handleSaveExpense(expense) {
        saveExpense(expense)
        // setModalOpen(false)
        handleCloseModal()
    }

    return (
        <main className="main-app">
            {/* <pre>{JSON.stringify(expenses, null, 2)}</pre> */}
            <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <ExpenseList expenses={expenses} onRemoveExpense={onRemoveExpense} handleOpenModal={handleOpenModal} />
            <Chart />

            <ExpenseAdd open={modalOpen}
                handleClose={handleCloseModal}
                expense={currExpense}
                onSave={handleSaveExpense} />

            <button onClick={() => handleOpenModal(null)}>Add Expense!</button>
        </main>
    )
}