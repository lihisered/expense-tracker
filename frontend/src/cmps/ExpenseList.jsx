import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses, onRemoveExpense, handleOpenModal }) {
    return (
        <ul className="expense-list">
            {expenses.map(expense =>
                <section key={expense._id}>
                    <button onClick={() => onRemoveExpense(expense._id)}>Remove</button>
                    <ExpensePreview
                        expense={expense}
                        onClick={() => handleOpenModal(expense)}
                    />
                </section>
            )}
        </ul>
    )
}