import { useState } from 'react';

const BudgetWidget = ({ budget, spent, onUpdateBudget }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(budget);

  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const rawPct = budget > 0 ? (spent / budget) * 100 : 0;
  const remaining = Math.max(budget - spent, 0);
  const overBudget = budget > 0 && spent > budget;

  const status = !budget
    ? 'none'
    : overBudget
    ? 'danger'
    : rawPct > 80
    ? 'warning'
    : 'safe';

  const handleSave = () => {
    const v = Number(draft) || 0;
    onUpdateBudget(v);
    setEditing(false);
  };

  return (
    <div className="budget-card">
      <div className="budget-header">
        <span className="budget-title">
          🎯 Monthly Budget
        </span>
        {!editing && (
          <button
            className="budget-edit-btn"
            onClick={() => {
              setDraft(budget || '');
              setEditing(true);
            }}
          >
            {budget > 0 ? 'Edit' : 'Set Budget'}
          </button>
        )}
      </div>

      {editing ? (
        <div className="budget-edit-row">
          <input
            type="number"
            min="0"
            placeholder="e.g. 15000"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
          <button className="btn-sm btn-primary" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn-sm btn-secondary"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : budget > 0 ? (
        <>
          <div className="budget-numbers">
            <span className="budget-spent">
              ₹ {spent.toLocaleString('en-IN')}
            </span>
            <span className="budget-of">
              {' '}
              of ₹ {budget.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="budget-progress">
            <div
              className={`budget-fill budget-fill-${status}`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className={`budget-status budget-status-${status}`}>
            {overBudget
              ? `⚠️ Over budget by ₹ ${(
                  spent - budget
                ).toLocaleString('en-IN')}`
              : `₹ ${remaining.toLocaleString('en-IN')} remaining · ${rawPct.toFixed(
                  0
                )}% used`}
          </div>
        </>
      ) : (
        <p className="budget-empty">
          No budget set for this month. Click "Set Budget" to add one.
        </p>
      )}
    </div>
  );
};

export default BudgetWidget;