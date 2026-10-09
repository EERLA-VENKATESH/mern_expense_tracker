const QuickStats = ({ total, byCategory }) => {
  const count = byCategory.reduce((sum, c) => sum + c.count, 0);

  const highest =
    byCategory.length > 0
      ? byCategory.reduce(
          (max, c) => (c.total > max.total ? c : max),
          byCategory[0]
        )
      : null;

  const dayOfMonth = new Date().getDate();
  const dailyAvg = count > 0 ? total / dayOfMonth : 0;

  const stats = [
    {
      icon: '🔥',
      label: 'Highest',
      value: highest
        ? `₹${highest.total.toLocaleString('en-IN')}`
        : '—',
      sub: highest ? highest.category : 'No data',
      accent: '#ef4444',
    },
    {
      icon: '📊',
      label: 'Daily Avg',
      value: `₹${dailyAvg.toFixed(0)}`,
      sub: `over ${dayOfMonth} days`,
      accent: '#6366f1',
    },
    {
      icon: '🧾',
      label: 'Entries',
      value: count,
      sub: count === 1 ? 'expense' : 'expenses',
      accent: '#10b981',
    },
  ];

  return (
    <div className="stats-row">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div
            className="stat-icon-wrap"
            style={{ background: `${s.accent}15` }}
          >
            <span className="stat-icon">{s.icon}</span>
          </div>
          <div className="stat-content">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.accent }}>
              {s.value}
            </div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;