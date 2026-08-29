with open("src/pages/Habits.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove dummyChartData and import
old_import = """import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import '../styles/App.css';

const dummyChartData = [
  { name: '1', uv: 20 },
  { name: '2', uv: 30 },
  { name: '3', uv: 25 },
  { name: '4', uv: 40 },
  { name: '5', uv: 30 },
  { name: '6', uv: 50 },
  { name: '7', uv: 60 }
];"""

new_import = """import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import '../styles/App.css';"""

content = content.replace(old_import, new_import)

# 2. Rewrite calculateStats
old_calc = """  // Stats Logic (simplified)
  const calculateStats = () => {
    let currentStreak = 0;
    let totalCompleted = 0;
    let totalPossible = 0;
    const habitStats = {};
    
    habits.filter(h => h.active).forEach(h => {
      habitStats[h.id] = { name: h.name, completed: 0, total: 30 }; 
    });

    for(let i=0; i<30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toLocaleDateString('sv-SE');
      const dayLogs = habitLogs[dStr] || {};
      
      const dayCompleted = Object.values(dayLogs).filter(l => l.completed).length;
      totalCompleted += dayCompleted;
      totalPossible += habits.filter(h => h.active).length;

      Object.keys(dayLogs).forEach(hid => {
        if (dayLogs[hid].completed && habitStats[hid]) {
          habitStats[hid].completed++;
        }
      });
    }

    const percentage = totalPossible === 0 ? 0 : Math.round((totalCompleted / totalPossible) * 100);
    const bestHabits = Object.values(habitStats)
      .map(h => ({ ...h, pct: Math.round((h.completed / h.total) * 100) }))
      .sort((a,b) => b.pct - a.pct)
      .slice(0, 3);

    return { percentage, currentStreak, totalCompleted, bestHabits };
  };"""

new_calc = """  // Stats Logic - Robust & Professional
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
    for(let i=29; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const endOfDayTs = d.setHours(23, 59, 59, 999);
      const dStr = new Date(endOfDayTs).toLocaleDateString('sv-SE');
      const dayLogs = habitLogs[dStr] || {};
      
      let dayPossible = 0;
      let dayCompleted = 0;

      activeHabits.forEach(h => {
        // Only count habit as possible if it existed on that day
        const createdTs = h.created_at || 0; // Assume 0 if legacy
        if (createdTs <= endOfDayTs) {
          dayPossible++;
          habitStats[h.id].total++;
          if (dayLogs[h.id]?.completed) {
            dayCompleted++;
            habitStats[h.id].completed++;
          }
        }
      });

      totalCompleted += dayCompleted;
      totalPossible += dayPossible;

      // Collect last 7 days for the AreaChart
      if (i < 7) {
        const dayPct = dayPossible > 0 ? Math.round((dayCompleted / dayPossible) * 100) : 0;
        chartData.push({ name: dStr.slice(-5), uv: dayPct });
      }
    }

    const percentage = totalPossible === 0 ? 0 : Math.round((totalCompleted / totalPossible) * 100);
    const bestHabits = Object.values(habitStats)
      .filter(h => h.total > 0)
      .map(h => ({ ...h, pct: Math.round((h.completed / h.total) * 100) }))
      .sort((a,b) => b.pct - a.pct)
      .slice(0, 3);

    return { percentage, currentStreak, totalCompleted, bestHabits, chartData };
  };"""

content = content.replace(old_calc, new_calc)

# 3. Replace dummyChartData usage with stats.chartData
content = content.replace("data={dummyChartData}", "data={stats.chartData}")

# 4. Fix unicode errors globally in the file
content = content.replace("Hǭbitos", "Hábitos")
content = content.replace("hǭbitos", "hábitos")
content = content.replace("Aadir", "Añadir")
content = content.replace("Ao", "Año")
content = content.replace("Pequeas", "Pequeñas")
content = content.replace("Estadisticas", "Estadísticas")
content = content.replace("ESTADISTICAS", "ESTADÍSTICAS")
content = content.replace("pǭginas", "páginas")
content = content.replace("mantendrǭn", "mantendrán")
content = content.replace("archivarǭ", "archivará")
content = content.replace("Eliminar", "¿Eliminar")

with open("src/pages/Habits.jsx", "w", encoding="utf-8") as f:
    f.write(content)
