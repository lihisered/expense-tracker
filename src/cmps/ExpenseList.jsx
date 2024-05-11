import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses, onRemoveExpense }) {
    return (
        <ul className="expense-list">
            {expenses.map(expense =>
                // <button onClick={() => onRemoveExpense(expense._id)}>Remove</button>
                <ExpensePreview
                    key={expense._id}
                    expense={expense}
                />
            )}
        </ul>
    )
}