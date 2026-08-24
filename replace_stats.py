import sys

with open('src/pages/Habits.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "/* STATS VIEW (Accessible via the ESTADISTICAS button) */"
end_marker = "{/* Input Modal */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find markers")
    sys.exit(1)

new_stats_view = """/* STATS VIEW (Accessible via the ESTADISTICAS button) */
        <div className="stats-view animate-fade-in" style={{ padding: '10px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
            <button onClick={() => setActiveTab('tracker')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ChevronLeft size={24} />
            </button>
            <h2 style={{ margin: '0 0 0 10px', fontSize: '20px', fontWeight: 'bold' }}>Estadisticas</h2>
          </div>

          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '4px', marginBottom: '25px' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: 'var(--accent-neon)', borderRadius: '16px', color: '#fff', fontSize: '13px', fontWeight: '600' }}>Semana</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>Mes</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>Trimestre</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>Año</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>CUMPLIMIENTO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '15px' }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.percentage}%</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>esta semana</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <div style={{ width: `${stats.percentage}%`, height: '100%', background: 'var(--accent-neon)', borderRadius: '2px' }}></div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>POR DIA</div>
            <div style={{ height: '140px', width: '100%', marginLeft: '-20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyChartData}>
                  <defs>
                    <linearGradient id="colorStatsUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-neon)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--accent-neon)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="uv" stroke="var(--accent-neon)" strokeWidth={3} fillOpacity={1} fill="url(#colorStatsUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>POR HABITO</div>
            {stats.bestHabits.map((h, i) => {
              let color = '#22c55e'; // green
              if (h.pct < 50) color = '#ef4444'; // red
              else if (h.pct < 80) color = '#f59e0b'; // yellow

              return (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '13px', color: '#fff' }}>{h.name}</span>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{h.pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                    <div style={{ width: `${h.pct}%`, height: '100%', background: color, borderRadius: '2px' }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>LEYENDA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div>
                <span style={{ fontSize: '13px', color: '#fff' }}>Completado</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                <span style={{ fontSize: '13px', color: '#fff' }}>No completado</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sin registrar</span>
              </div>
            </div>
            <p style={{ marginTop: '15px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Un dia sin registrar no cuenta como fallo. Solo los dias marcados como completados o no completados se consideran.
            </p>
          </div>

        </div>
      )}

      """

new_content = content[:start_idx] + new_stats_view + content[end_idx:]

with open('src/pages/Habits.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Updated Habits.jsx")
