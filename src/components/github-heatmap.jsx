import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const GitHubHeatmap = ({ username }) => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const lastYear = currentYear - 1;

        const [currentYearRes, lastYearRes] = await Promise.all([
          fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${currentYear}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${lastYear}`)
        ]);

        if (!currentYearRes.ok || !lastYearRes.ok) {
          throw new Error(`API error`);
        }

        const [currentYearData, lastYearData] = await Promise.all([
          currentYearRes.json(),
          lastYearRes.json()
        ]);

        if (!mounted) return;

        const allContributions = [
          ...lastYearData.contributions,
          ...currentYearData.contributions
        ];

        const today = new Date();
        today.setHours(23, 59, 59, 999);

        // Go back exactly 52 weeks to get a proper year view
        const oneYearAgo = new Date(today);
        oneYearAgo.setDate(oneYearAgo.getDate() - (52 * 7 - 1)); // 52 weeks minus 1 day
        oneYearAgo.setHours(0, 0, 0, 0);

        const last365Days = allContributions.filter(day => {
          const dayDate = new Date(day.date + 'T00:00:00');
          return dayDate >= oneYearAgo && dayDate <= today;
        });

        // Sort by date
        last365Days.sort((a, b) => new Date(a.date) - new Date(b.date));

        const total = last365Days.reduce((sum, day) => sum + day.count, 0);
        setTotalContributions(total);

        const weeks = transformToWeeks(last365Days);
        setWeeks(weeks);
      } catch (err) {
        if (!mounted) return;
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const transformToWeeks = (contributions) => {
      if (contributions.length === 0) return [];

      const weeks = [];
      const firstDate = new Date(contributions[0].date + 'T00:00:00');
      const lastDate = new Date(contributions[contributions.length - 1].date + 'T00:00:00');

      // Find the Sunday before or on the first date
      const startDate = new Date(firstDate);
      startDate.setDate(startDate.getDate() - startDate.getDay());

      // Create a map for quick lookup
      const contribMap = {};
      contributions.forEach(day => {
        contribMap[day.date] = day.count;
      });

      let currentDate = new Date(startDate);
      let currentWeek = [];

      while (currentDate <= lastDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = contribMap[dateStr] || 0;

        currentWeek.push({
          date: dateStr,
          count: count
        });

        if (currentWeek.length === 7) {
          weeks.push(currentWeek);
          currentWeek = [];
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (currentWeek.length > 0) {
        weeks.push(currentWeek);
      }

      return weeks;
    };

    fetchData();
    return () => { mounted = false; };
  }, [username]);

  const getIntensityClass = (count) => {
    if (count === 0) return 'bg-gray-900/40 border border-gray-700/30';
    if (count <= 2) return 'bg-emerald-900/60 border border-emerald-700/30';
    if (count <= 4) return 'bg-emerald-600/70 border border-emerald-500/40';
    if (count <= 6) return 'bg-emerald-500/80 border border-emerald-400/50';
    return 'bg-emerald-400/90 border border-emerald-300/60';
  };

  // Skeleton loader component
  const SkeletonHeatmap = () => {
    const skeletonWeeks = 52;
    const skeletonDays = 7;
    
    return (
      <div className="bg-zinc-800/40 border border-white/10 rounded-2xl p-6 md:p-8 animate-pulse">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-zinc-700 rounded"></div>
              <div className="h-6 w-32 bg-zinc-700 rounded"></div>
            </div>
            <div className="h-4 w-48 bg-zinc-700/50 rounded"></div>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide flex justify-center">
          <div className="inline-flex gap-1 min-w-max">
            {/* Day labels skeleton */}
            <div className="flex flex-col gap-1 pr-2 justify-around" style={{ paddingTop: 20 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-3 w-6 bg-zinc-700/30 rounded"></div>
              ))}
            </div>

            <div className="flex flex-col">
              {/* Month labels skeleton */}
              <div className="flex mb-1 gap-1" style={{ height: 16 }}>
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div key={idx} className="w-8 h-3 bg-zinc-700/30 rounded" style={{ marginLeft: idx * 28 }}></div>
                ))}
              </div>

              {/* Grid skeleton */}
              <div className="flex gap-1">
                {Array.from({ length: skeletonWeeks }).map((_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1">
                    {Array.from({ length: skeletonDays }).map((_, dayIdx) => (
                      <div
                        key={dayIdx}
                        className="w-3 h-3 rounded-sm bg-zinc-700/40"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="h-3 w-32 bg-zinc-700/30 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 bg-zinc-700/30 rounded"></div>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-3 h-3 bg-zinc-700/40 rounded-sm"></div>
              ))}
            </div>
            <div className="h-3 w-8 bg-zinc-700/30 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <SkeletonHeatmap />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 bg-gradient-to-br from-red-900/20 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-red-500/20 shadow-2xl">
        <div className="text-red-400 font-medium">Error: {error}</div>
      </div>
    );
  }

  // Compute month labels - show label when month changes
  const monthLabels = weeks.map((week, i) => {
    if (!week || week.length === 0) return null;

    // Get the first day of this week
    const currentDate = new Date(week[0].date + 'T00:00:00');
    const currentMonth = currentDate.getMonth();

    // Check if this is a new month compared to the previous week
    if (i === 0) {
      return monthNames[currentMonth];
    }

    const prevWeek = weeks[i - 1];
    if (prevWeek && prevWeek.length > 0) {
      const prevDate = new Date(prevWeek[0].date + 'T00:00:00');
      const prevMonth = prevDate.getMonth();

      // Only show label if month changed
      if (currentMonth !== prevMonth) {
        return monthNames[currentMonth];
      }
    }

    return null;
  });

  return (
    <div className="bg-zinc-800/40 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub Activity
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>
      </div>

        <div className="overflow-x-auto scrollbar-hide flex justify-center">
          <div className="inline-flex gap-1 min-w-max">
            {/* Day labels column */}
            <div className="flex flex-col gap-1 pr-2 justify-around" style={{ paddingTop: 20 }}>
              {['Mon', 'Wed', 'Fri'].map((day) => (
                <div key={day} className="h-3 flex items-center">
                  <span className="text-[10px] text-gray-500 font-medium">{day}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              {/* Month labels row */}
              <div className="flex mb-1" style={{ height: 16 }}>
                {weeks.map((week, idx) => (
                  <div key={idx} className="w-3 mx-0.5 flex items-center justify-start">
                    {monthLabels[idx] && (
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                        {monthLabels[idx]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Heatmap grid */}
              <div className="flex gap-1">
                {weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1">
                    {week.map((day, dayIdx) => {
                      const count = day.count ?? 0;
                      const dateObj = new Date(day.date + 'T00:00:00');
                      const title = `${dateObj.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}: ${count} contribution${count !== 1 ? 's' : ''}`;
                      return (
                        <div
                          key={dayIdx}
                          className={`w-3 h-3 rounded-sm ${getIntensityClass(count)} hover:ring-2 hover:ring-emerald-400/70 hover:scale-110 cursor-pointer transition-all duration-200`}
                          title={title}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-900/40 rounded-sm border border-gray-700/30" />
              <div className="w-3 h-3 bg-emerald-900/60 rounded-sm border border-emerald-700/30" />
              <div className="w-3 h-3 bg-emerald-600/70 rounded-sm border border-emerald-500/40" />
              <div className="w-3 h-3 bg-emerald-500/80 rounded-sm border border-emerald-400/50" />
              <div className="w-3 h-3 bg-emerald-400/90 rounded-sm border border-emerald-300/60" />
            </div>
            <span>More</span>
          </div>
        </div>
    </div>
  );
};

GitHubHeatmap.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GitHubHeatmap; 