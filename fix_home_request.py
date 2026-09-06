import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the OrbPlanetarySystem with the carousel
carousel_html = """
        <div className="carousel-container" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: '30px', padding: '20px 50px', alignItems: 'center', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {RANKS.map((rank, i) => {
            const locked = currentStreak < rank.req;
            return (
              <div 
                key={rank.id} 
                className={`carousel-item ${i === viewIndex ? 'active' : ''} ${locked ? 'locked' : ''}`}
                onClick={() => setViewIndex(i)}
                style={{ scrollSnapAlign: 'center', width: '90px', flexShrink: 0, opacity: i === viewIndex ? 1 : 0.4, transform: `scale(${i === viewIndex ? 1.2 : 0.8})`, transition: 'all 0.3s ease' }}
              >
                <div style={{ pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
                  <EnergyOrb rankIndex={i} size={i === viewIndex ? 120 : 90} locked={locked} animated={i === viewIndex} />
                </div>
              </div>
            );
          })}
        </div>
"""
content = re.sub(r'<div className="orb-system-container".*?</OrbPlanetarySystem>\s*</div>', carousel_html, content, flags=re.DOTALL)

# 2. Move Check-in into Risk Card, and center Meditate button
# We need to find the action-buttons-row
buttons_row_regex = r'\{\/\*\s*Action Buttons\s*\*\/\}.*?<div className="action-buttons-row">.*?</div>\s*</div>'
meditate_only = """
        {/* Action Buttons */}
        <div className="action-buttons-row" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
          <div className="action-btn-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button className="circle-btn" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '8px' }}>
              <Wind size={24} strokeWidth={1.5} />
            </button>
            <span className="action-label" style={{ fontSize: '12px', color: '#9ca3af' }}>Meditar</span>
          </div>
        </div>
"""
content = re.sub(buttons_row_regex, meditate_only, content, flags=re.DOTALL)

# 3. Add Check-in to Risk Card and add the Important Note
risk_card_regex = r'<div className="glass-panel risk-card">.*?<div className="risk-header">.*?</div>.*?</div>'
new_risk_card = """
        <div className="glass-panel risk-card">
          <div className="risk-header">
            <h3 className="card-title">RIESGO DE RECAÍDA <span className="info-icon">ⓘ</span></h3>
          </div>
          
          <div className="risk-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p className="risk-desc" style={{ flex: 1, paddingRight: '20px' }}>Estimación basada en hábitos, actividad reciente y patrones registrados.</p>
            <div className="risk-gauge" style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <path className="circle" strokeDasharray={`${riskValue}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={riskColor} strokeWidth="3" strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
              </svg>
              <div className="risk-percentage" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>{riskValue}%</div>
            </div>
          </div>
          
          <div style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#60A5FA', margin: 0, lineHeight: 1.4 }}>
              <strong>Nota importante:</strong> Para que la IA pueda recalcular con exactitud tu riesgo de recaída, es vital que pulses el botón de "Check-in" diariamente.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="glass-btn primary" onClick={() => setShowCheckIn(true)} style={{ flex: 1, background: '#2563EB', color: '#fff', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <Check size={16} strokeWidth={2} /> Check-in
            </button>
            <button className="glass-btn secondary" onClick={() => setShowRiskAnalysis(true)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              Ver análisis
            </button>
          </div>
        </div>
"""
content = re.sub(risk_card_regex, new_risk_card, content, flags=re.DOTALL)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
