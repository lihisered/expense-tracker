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
                    "#f78fb3",
                    "#d6a2e8",
                    "#786fa6",
                    "#574b90",
                    "#63cdda",
                    "#546de5",
                    "#1abc9c"
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
            <div>
                <h2>Expense Distribution</h2>
                <Pie data={chartData} options={options} />
            </div>
        </section>
    )
}