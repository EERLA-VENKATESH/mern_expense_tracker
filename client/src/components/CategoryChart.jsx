const COLORS = {
  Food: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
  Travel: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
  Bills: 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)',
  Shopping: 'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)',
  Entertainment: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
  Health: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
  Other: 'linear-gradient(90deg, #64748b 0%, #94a3b8 100%)',
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

const CategoryChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className="chart">
      {data.map((item) => {
        const widthPct = (item.total / max) * 100;
        const bg = COLORS[item.category] || COLORS.Other;
        const emoji = EMOJIS[item.category] || '📦';
        return (
          <div className="chart-row" key={item.category}>
            <span className="chart-label">
              <span className="cat-emoji">{emoji}</span>
              {item.category}
            </span>
            <div className="chart-track">
              <div
                className="chart-fill"
                style={{ width: `${widthPct}%`, background: bg }}
              />
            </div>
            <span className="chart-amount">
              ₹ {item.total.toLocaleString('en-IN')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryChart;