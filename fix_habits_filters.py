import os

file_path = "src/pages/Habits.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add state variable
state_find = "const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' or 'stats'"
state_replace = "const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' or 'stats'\n  const [timeFilter, setTimeFilter] = useState('Semana'); // 'Semana', 'Mes', 'Trimestre', 'Año'"
content = content.replace(state_find, state_replace)

# 2. Modify calculateStats
calc_find = """  // Stats Logic - Robust & Professional
  const calculateStats = () => {
    let currentStreak = 0;
    let totalCompleted = 0;
    let totalPossible = 0;
    const habitStats = {};
    const chartData = [];
    
    // We only analyze the last 7 days for the chart, but 30 days for overall stats
    const activeHabits = habits.filter(h => h.active);
    activeHabits.forEach(h => {
      habitStats[h.id] = { name: h.name, completed: 0, total: 0 }; 
    });

    // 30 days lookback
    for(let i=29; i>=0; i--) {"""

calc_replace = """  // Stats Logic - Robust & Professional
  const calculateStats = () => {
    let currentStreak = 0;
    let totalCompleted = 0;
    let totalPossible = 0;
    const habitStats = {};
    const chartData = [];
    
    let lookbackDays = 7;
    if (timeFilter === 'Mes') lookbackDays = 30;
    if (timeFilter === 'Trimestre') lookbackDays = 90;
    if (timeFilter === 'Año') lookbackDays = 365;

    const activeHabits = habits.filter(h => h.active);
    activeHabits.forEach(h => {
      habitStats[h.id] = { name: h.name, completed: 0, total: 0 }; 
    });

    for(let i=lookbackDays-1; i>=0; i--) {"""
content = content.replace(calc_find, calc_replace)

# 3. Modify chartData collection inside calculateStats
chart_find = """      // Collect last 7 days for the AreaChart
      if (i < 7) {
        const dayPct = dayPossible > 0 ? Math.round((dayCompleted / dayPossible) * 100) : 0;
        chartData.push({ name: dStr.slice(-5), uv: dayPct });
      }"""

chart_replace = """      const dayPct = dayPossible > 0 ? Math.round((dayCompleted / dayPossible) * 100) : 0;
      // For large datasets, don't label every single point to avoid crowding
      const label = (lookbackDays <= 30 || i % Math.ceil(lookbackDays / 10) === 0) ? dStr.slice(-5) : '';
      chartData.push({ name: label, uv: dayPct });"""
content = content.replace(chart_find, chart_replace)

# 4. Update Filter UI
ui_find = """          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '4px', marginBottom: '25px' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: 'var(--accent-neon)', borderRadius: '16px', color: '#fff', fontSize: '13px', fontWeight: '600' }}>Semana</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>Mes</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>Trimestre</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>Año</div>
          </div>"""

ui_replace = """          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '4px', marginBottom: '25px' }}>
            {['Semana', 'Mes', 'Trimestre', 'Año'].map(tf => (
              <div 
                key={tf}
                onClick={() => setTimeFilter(tf)}
                style={{ 
                  flex: 1, textAlign: 'center', padding: '8px', 
                  background: timeFilter === tf ? 'var(--accent-neon)' : 'transparent', 
                  borderRadius: '16px', 
                  color: timeFilter === tf ? '#fff' : 'var(--text-muted)', 
                  fontSize: '13px', fontWeight: timeFilter === tf ? '600' : 'normal',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {tf}
              </div>
            ))}
          </div>"""
content = content.replace(ui_find, ui_replace)


# 5. Dynamic text for CUMPLIMIENTO
text_find = "<span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>esta semana</span>"
text_replace = """<span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                {timeFilter === 'Semana' ? 'esta semana' : 
                 timeFilter === 'Mes' ? 'este mes' : 
                 timeFilter === 'Trimestre' ? 'este trimestre' : 'este año'}
              </span>"""
content = content.replace(text_find, text_replace)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
