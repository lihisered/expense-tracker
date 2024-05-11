import { ExpenseList } from '../cmps/ExpenseList'
import { ExpenseFilter } from '../cmps/ExpenseFilter'
import { Chart } from '../cmps/Chart'

export function Dashboard() {
    return (
        <main className="main-app">
            Dashboard page
            <ExpenseFilter />
            <ExpenseList />
            <Chart />
        </main>
    )
}