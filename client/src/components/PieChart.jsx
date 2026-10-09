const COLORS = {
  Food: '#f59e0b',
  Travel: '#3b82f6',
  Bills: '#ef4444',
  Shopping: '#ec4899',
  Entertainment: '#8b5cf6',
  Health: '#10b981',
  Other: '#64748b',
};

const EMOJIS = {
  Food: '🍔',
  Travel: '✈️',
  Bills: '📄',
  Shopping: '🛍️',
  Entertainment: '🎬',
  Health: '💊',
  Other: '📦',
};

const PieChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.total, 0);

  if (total === 0) {
    return (
      <div className="pie-empty">
        <span className="emoji">📊</span>
        <p>No data yet</p>
      </div>
    );
  }

  let cumulative = 0;
  const stops = data.map((item) => {
    const start = cumulative;
    cumulative += (item.total / total) * 100;
    const end = cumulative;
    const color = COLORS[item.category] || COLORS.Other;
    return `${color} ${start}% ${end}%`;
  });
  const gradient = `conic-gradient(${stops.join(', ')})`;

  return (
    <div className="pie-layout">
      <div className="pie-visual">
        <div className="pie" style={{ background: gradient }}>
          <div className="pie-hole">
            <div className="pie-hole-label">TOTAL</div>
            <div className="pie-hole-value">
              ₹{total.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      <div className="pie-legend">
        {data.map((item) => {
          const pct = ((item.total / total) * 100).toFixed(1);
          const color = COLORS[item.category] || COLORS.Other;
          return (
            <div className="legend-row" key={item.category}>
              <span
                className="legend-dot"
                style={{ background: color }}
              />
              <span className="legend-name">
                {EMOJIS[item.category]} {item.category}
              </span>
              <span className="legend-amount">
                ₹{item.total.toLocaleString('en-IN')}
              </span>
              <span className="legend-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChart;