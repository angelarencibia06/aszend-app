import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace everything from {/* RIESGO DE RECAIDA */} down to the Ver analisis button.
old_riesgo = r'\{\/\*\s*RIESGO DE RECAIDA\s*\*\/\}.*?<button className="wide-btn" onClick=\{\(\) => setShowRiskAnalysis\(true\)\}>\s*<LineChart size=\{16\} \/>\s*Ver anǭlisis detallado\s*<\/button>\s*<\/div>'
# Wait, maybe the regex is too complex with encodings. Let's just find the index of "{/* RIESGO DE RECAIDA */}" and the end of the div.
start_idx = content.find('{/* RIESGO DE RECAIDA */}')
end_idx = content.find('Ver an\u01edlisis detallado\n        </button>\n      </div>', start_idx)
if end_idx == -1:
    # Try another way
    end_idx = content.find('Ver', start_idx)
    end_idx = content.find('</div>', end_idx) + 6

if start_idx != -1 and end_idx != -1:
    new_riesgo = '''{/* RIESGO DE RECAIDA */}
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
          <button className="wide-btn" onClick={() => setShowCheckIn(true)} style={{ flex: 1, background: '#2563EB', color: '#fff', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <Check size={16} /> Check-in
          </button>
          <button className="wide-btn" onClick={() => setShowRiskAnalysis(true)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <LineChart size={16} /> Ver análisis
          </button>
        </div>
      </div>'''
    content = content[:start_idx] + new_riesgo + content[end_idx:]

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
