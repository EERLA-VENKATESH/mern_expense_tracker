import { useState } from 'react';

const EMOJIS = {
  Food: '🍔',
  Travel: '✈️',
  Bills: '📄',
  Shopping: '🛍️',
  Entertainment: '🎬',
  Health: '💊',
  Other: '📦',
};

const BORDER_COLORS = {
  Food: '#f59e0b',
  Travel: '#3b82f6',
  Bills: '#ef4444',
  Shopping: '#ec4899',
  Entertainment: '#8b5cf6',
  Health: '#10b981',
  Other: '#64748b',
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const ExpenseItem = ({ expense, onUpdate, onDelete, categories }) => {
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [note, setNote] = useState(expense.note);

  const handleSave = () => {
    onUpdate(expense._id, {
      amount: Number(amount),
      category,
      note: note.trim(),
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <div
        className="expense-item"
        style={{ borderLeftColor: BORDER_COLORS[category] }}
      >
        <div className="expense-main">
          <div className="form-row" style={{ marginBottom: 6 }}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {EMOJIS[c]} {c}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
          />
        </div>
        <div className="expense-actions">
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
      </div>
    );
  }

  return (
    <div
      className="expense-item"
      style={{ borderLeftColor: BORDER_COLORS[expense.category] }}
    >
      <div className="expense-main">
        <div className="expense-top">
          <span className="expense-amount">
            ₹ {expense.amount.toLocaleString('en-IN')}
          </span>
          <span className="expense-cat">
            <span>{EMOJIS[expense.category]}</span>
            {expense.category}
          </span>
        </div>
        <div className="expense-meta">
          📅 {formatDate(expense.date)}
          {expense.note && ` · ${expense.note}`}
        </div>
      </div>
      <div className="expense-actions">
        <button
          className="btn-sm btn-secondary"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        <button
          className="btn-sm btn-danger"
          onClick={() => onDelete(expense._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;