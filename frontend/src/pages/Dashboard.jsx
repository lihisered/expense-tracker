import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ExpenseList } from '../cmps/ExpenseList'
import { ExpenseFilter } from '../cmps/ExpenseFilter'
import { ExpenseAdd } from '../cmps/ExpenseAdd'
import { Chart } from '../cmps/Chart'
import { Navbar } from '../cmps/Navbar'
import { LoginSignup } from '../cmps/LoginSignup'
import { Categories } from '../cmps/Categories.jsx'

import { loadExpenses, removeExpense, saveExpense } from '../store/actions/expense.actions'
import { logout } from '../store/actions/user.actions.js'

export function Dashboard() {

    const dispatch = useDispatch()

    const filterBy = useSelector(storeState => storeState.expenseModule.filterBy)
    const expenses = useSelector(storeState => storeState.expenseModule.expenses)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    const [modalOpen, setModalOpen] = useState(false)
    const [loginSignupModalOpen, setLoginSignupModalOpen] = useState(false)
    const [currExpense, setCurrExpense] = useState(null)

    useEffect(() => {
        fetchData()
    }, [filterBy, user])

    async function fetchData() {
        try {
            await loadExpenses()
        } catch (err) {
            console.log('Cannot load expenses', err)
        }
    }

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
        handleCloseModal()
    }

    function handleOpenLoginSignupModal() {
        setLoginSignupModalOpen(true)
    }

    function handleCloseLoginSignupModal() {
        setLoginSignupModalOpen(false)
    }

    function handleLogout() {
        logout()
    }

    return (
        <main className="main-app">
            <Navbar user={user} handleOpen={handleOpenModal}
                handleOpenLoginSignup={handleOpenLoginSignupModal} handleLogout={handleLogout} />
            <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <ExpenseList expenses={expenses}
                onRemoveExpense={onRemoveExpense}
                handleOpenModal={handleOpenModal} />
            <Chart expenses={expenses} />

            <Categories />

            <ExpenseAdd open={modalOpen}
                handleClose={handleCloseModal}
                expense={currExpense}
                onSave={handleSaveExpense} />

            <LoginSignup open={loginSignupModalOpen}
                handleClose={handleCloseLoginSignupModal} />
        </main>
    )
}