import CategoryChart from './CategoryChart';

const Summary = ({ total, byCategory }) => {
  const hasData = byCategory.length > 0;

  return (
    <div className="summary-card">
      <div className="summary-header">
        <h2>All Time · Expense Summary</h2>
        <span className="summary-icon">💎</span>
      </div>
      <div className="summary-total">
        ₹ {total.toLocaleString('en-IN')}
      </div>
      <div className="summary-label">Total spent (all time)</div>

      {hasData ? (
        <CategoryChart data={byCategory} />
      ) : (
        <div className="summary-empty">
          ✨ No expenses recorded yet — add one to get started
        </div>
      )}
    </div>
  );
};

export default Summary;