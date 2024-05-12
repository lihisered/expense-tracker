import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses, onRemoveExpense, handleOpenModal }) {
    return (
        <ul className="expense-list scrollable-content">
            {expenses.map(expense =>
                <section key={expense._id}>
                    <ExpensePreview
                        expense={expense}
                        onClick={() => handleOpenModal(expense)}
                        onRemove={onRemoveExpense}
                    />
                </section>
            )}
        </ul>
    )
}