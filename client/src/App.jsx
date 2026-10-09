import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import BudgetWidget from './components/BudgetWidget';
import QuickStats from './components/QuickStats';
import PieChart from './components/PieChart';
import './App.css';

const API = 'http://localhost:5000/api/expenses';
const SETTINGS_API = 'http://localhost:5000/api/settings';

export const CATEGORIES = [
  'Food',
  'Travel',
  'Bills',
  'Shopping',
  'Entertainment',
  'Health',
  'Other',
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, byCategory: [] });
  const [budget, setBudget] = useState(0);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    try {
      const res = await fetch(`${API}/summary`);
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBudget = async () => {
    try {
      const res = await fetch(`${SETTINGS_API}/budget`);
      const data = await res.json();
      setBudget(data.monthlyBudget || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const updateBudget = async (value) => {
    try {
      const res = await fetch(`${SETTINGS_API}/budget`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monthlyBudget: value }),
      });
      const data = await res.json();
      setBudget(data.monthlyBudget);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchExpenses = async (cat = filter) => {
    try {
      setLoading(true);
      const url = cat && cat !== 'All' ? `${API}?category=${cat}` : API;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load expenses');
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
    fetchBudget();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (cat) => {
    setFilter(cat);
    fetchExpenses(cat);
  };

  const addExpense = async (expense) => {
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!res.ok) throw new Error('Failed to add');
      const created = await res.json();
      if (filter === 'All' || filter === created.category) {
        setExpenses([created, ...expenses]);
      }
      fetchSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateExpense = async (id, updates) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setExpenses(expenses.map((e) => (e._id === id ? updated : e)));
      fetchSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setExpenses(expenses.filter((e) => e._id !== id));
      fetchSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const hasData = summary.byCategory.length > 0;

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span className="emoji">💵</span> Expense Tracker
        </h1>
        <p>
          Built with <span>MongoDB</span> · <span>Express.js</span> ·{' '}
          <span>React.js</span> · <span>Node.js</span>
        </p>
      </header>

      <div className="dashboard">
        {/* LEFT COLUMN */}
        <div className="col-main">
          <Summary total={summary.total} byCategory={summary.byCategory} />

          {hasData && (
            <div className="card">
              <h2>⚡ Quick Stats</h2>
              <QuickStats
                total={summary.total}
                byCategory={summary.byCategory}
              />
            </div>
          )}

          <div className="card">
            <div className="filter-bar">
              <label htmlFor="filter">Filter by category:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="All">All</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p
                style={{
                  color: '#ef4444',
                  fontSize: 13,
                  marginBottom: 10,
                }}
              >
                {error}
              </p>
            )}

            {loading ? (
              <p className="empty">Loading expenses...</p>
            ) : (
              <ExpenseList
                expenses={expenses}
                onUpdate={updateExpense}
                onDelete={deleteExpense}
                categories={CATEGORIES}
              />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-side">
          <BudgetWidget
            budget={budget}
            spent={summary.total}
            onUpdateBudget={updateBudget}
          />

          {hasData && (
            <div className="card">
              <h2>🍩 Spending Breakdown</h2>
              <PieChart data={summary.byCategory} />
            </div>
          )}

          <ExpenseForm onAdd={addExpense} categories={CATEGORIES} />
        </div>
      </div>

      <footer className="footer">
        Built with <strong>MongoDB</strong> · <strong>Express.js</strong> ·{' '}
        <strong>React.js</strong> · <strong>Node.js</strong>
      </footer>
    </div>
  );
}

export default App;