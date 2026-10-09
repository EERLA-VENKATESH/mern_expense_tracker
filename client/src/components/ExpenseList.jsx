import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onUpdate, onDelete, categories }) => {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <span className="emoji">🎯</span>
        <p>No expenses here yet. Add your first one above!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          onUpdate={onUpdate}
          onDelete={onDelete}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default ExpenseList;