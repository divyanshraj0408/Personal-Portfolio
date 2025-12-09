// components/GitHubHeatmap.jsx
import { useState, useEffect } from 'react';

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const GitHubHeatmap = ({ username }) => {
  const [weeks, setWeeks] = useState([]); // array of weeks: each week is array of 7 {date, count}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/github-heatmap?username=${encodeURIComponent(username)}`);
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`API error: ${res.status} ${txt}`);
        }
        const json = await res.json();
        if (!mounted) return;

        // json.weeks is an array of weeks (each week -> array of 7 days)
        setWeeks(json.weeks || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [username]);

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-gray-800 border border-gray-700';
    if (count <= 2) return 'bg-green-900';
    if (count <= 4) return 'bg-green-700';
    if (count <= 6) return 'bg-green-500';
    return 'bg-green-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 bg-gray-900 rounded-lg">
        <div className="text-gray-400">Loading heatmap...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 bg-gray-900 rounded-lg">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  // Compute month labels: for each week, check the first day's month. We'll render month labels over the top.
  const monthLabelPositions = {};
  weeks.forEach((week, i) => {
    if (!week || week.length === 0) return;
    const firstDay = week[0].date; // ISO string 'YYYY-MM-DD'
    const month = new Date(firstDay).getMonth();
    // only set the label for the first occurrence of the month
    if (monthLabelPositions[month] === undefined) monthLabelPositions[month] = i;
  });

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-2xl max-w-4xl mx-auto border border-gray-800">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-100">GitHub Contribution Heatmap</h3>
        <p className="text-sm text-gray-400">@{username}</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-start gap-2">
          {/* month labels row */}
          <div className="flex" style={{height: 18}}>
            {weeks.map((_, idx) => (
              <div key={idx} className="w-3 mx-0.5 text-[10px] text-gray-400" style={{textAlign: 'center'}}>
                {Object.values(monthLabelPositions).includes(idx)
                  ? monthNames[Object.keys(monthLabelPositions).find(key => monthLabelPositions[key] === idx)]
                  : ''}
              </div>
            ))}
          </div>
        </div>

        <div className="inline-flex gap-1 pt-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => {
                const count = day.count ?? 0;
                const dateObj = new Date(day.date);
                const title = `${dateObj.toLocaleDateString()}: ${count} contribution${count !== 1 ? 's' : ''}`;
                return (
                  <div
                    key={dayIdx}
                    className={`w-3 h-3 rounded-sm ${getIntensityClass(count)} hover:ring-2 hover:ring-green-400 cursor-pointer transition-all`}
                    title={title}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-800 rounded-sm border border-gray-700" />
          <div className="w-3 h-3 bg-green-900 rounded-sm" />
          <div className="w-3 h-3 bg-green-700 rounded-sm" />
          <div className="w-3 h-3 bg-green-500 rounded-sm" />
          <div className="w-3 h-3 bg-green-400 rounded-sm" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubHeatmap;
