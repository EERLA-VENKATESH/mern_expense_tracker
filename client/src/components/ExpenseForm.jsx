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

const todayISO = () => new Date().toISOString().slice(0, 10);

const ExpenseForm = ({ onAdd, categories }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    onAdd({
      amount: Number(amount),
      category,
      date,
      note: note.trim(),
    });

    setAmount('');
    setNote('');
    setCategory('Food');
    setDate(todayISO());
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>➕ Add New Expense</h2>

      <div className="form-row">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          type="text"
          placeholder="Note (optional) — e.g., Lunch with team"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary">
        + Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;