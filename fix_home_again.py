import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update action buttons row to only have Meditar
old_actions = r'\{\/\*\s*Action Buttons\s*\*\/\}\s*<div className="action-buttons-row">.*?<\/div>\s*<\/div>\s*<\/div>'
new_actions = r'''{/* Action Buttons */}
        <div className="action-buttons-row" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div className="action-btn-wrapper">
            <button className="circle-btn">
              <Wind size={24} strokeWidth={1.5} />
            </button>
            <span className="action-label">Meditar</span>
          </div>
        </div>
      </div>'''
content = re.sub(old_actions, new_actions, content, flags=re.DOTALL)


# 2. Update RIESGO DE RECAIDA card
old_riesgo = r'\{\/\*\s*RIESGO DE RECAIDA\s*\*\/\}.*?<button className="wide-btn" onClick=\{\(\) => setShowRiskAnalysis\(true\)\}>\s*<LineChart size=\{16\} \/>\s*Ver anǭlisis detallado\s*<\/button>\s*<\/div>'
new_riesgo = r'''{/* RIESGO DE RECAIDA */}
      <div className="premium-card">
        <div className="card-header-row" style={{ marginBottom: '12px' }}>
          <h2 className="card-title">
            RIESGO DE RECAÍDA
            <Info size={14} color="#6b7280" />
          </h2>
        </div>
        
        <div style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', color: '#60A5FA', margin: 0, lineHeight: 1.4 }}>
            <strong>Nota importante:</strong> Para que la IA pueda recalcular con exactitud tu riesgo de recaída, es vital que pulses el botón de "Check-in" diariamente.
          </p>
        </div>

        <div className="riesgo-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <p className="riesgo-text" style={{ flex: 1, paddingRight: '20px', margin: 0 }}>
            Estimación basada en hábitos, actividad reciente y patrones registrados.
          </p>
          <div className="riesgo-circle-wrapper" style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
            <svg width="70" height="70" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="riesgo-circle-bg" />
              <circle 
                cx="50" cy="50" r="40" 
                className="riesgo-circle-fill" 
                stroke={riskColor}
                strokeDasharray={`${251.2 * (riskValue / 100)} 251.2`} 
                transform="rotate(-90 50 50)" 
              />
            </svg>
            <div className="riesgo-percentage">{riskValue}%</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="wide-btn" onClick={() => setShowCheckIn(true)} style={{ flex: 1, background: '#2563EB', color: '#fff', border: 'none' }}>
            <Check size={16} /> Check-in
          </button>
          <button className="wide-btn" onClick={() => setShowRiskAnalysis(true)} style={{ flex: 1 }}>
            <LineChart size={16} /> Ver análisis
          </button>
        </div>
      </div>'''
content = re.sub(old_riesgo, new_riesgo, content, flags=re.DOTALL)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
