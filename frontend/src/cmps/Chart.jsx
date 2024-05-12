import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export function Chart({ expenses }) {

    const categories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
    }, {})

    const chartData = {
        labels: Object.keys(categories),
        datasets: [
            {
                data: Object.values(categories),
                backgroundColor: [
                    "#f44336",
                    "#ff9800",
                    "#2196f3",
                    "#4caf50",
                    "#e91e63",
                    "#9c27b0",
                    "#ffc107"
                ],
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <section className='expense-chart'>
            <h2>Expense Distribution</h2>
            <Pie data={chartData} options={options} />
        </section>
    )
}