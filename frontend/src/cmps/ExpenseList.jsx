import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses, handleOpenModal, onRemoveExpense }) {
    return (
        <ul className="expense-list scrollable-content">
            {expenses.length > 0 ? (
                expenses.map(expense => (
                    <section key={expense._id}>
                        <ExpensePreview
                            expense={expense}
                            onClick={() => handleOpenModal(expense)}
                            onRemove={onRemoveExpense}
                        />
                    </section>
                ))
            ) : (
                <p>You have no expenses yet</p>
            )}
        </ul>
    );
}
