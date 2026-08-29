import os
import re

css_path = "../aszend_app/src/styles/Home2.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Fix carousel container height
css = re.sub(r'\.carousel-container \{.*?height: 120px;', '.carousel-container {\n  width: 100%;\n  position: relative;\n  height: 160px;', css, flags=re.DOTALL)

# Fix z-index of active item to prevent ring cutoff
if "z-index: 10;" not in css:
    css = css.replace(".carousel-item.active {\n  opacity: 1;\n  transform: scale(1.1);\n}", ".carousel-item.active {\n  opacity: 1;\n  transform: scale(1.1);\n  z-index: 10;\n}")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)

home_path = "../aszend_app/src/pages/Home.jsx"
with open(home_path, "r", encoding="utf-8") as f:
    home = f.read()

# Fix the rank info display logic
old_rank_info = r'<div className="rank-info".*?<div className="action-buttons"'
new_rank_info = """<div className="rank-info" style={{ textAlign: 'center', marginTop: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: isLocked ? '#9ca3af' : '#fff', margin: '0 0 4px 0' }}>
            {activeRankDef.name}
          </h2>
          <p style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace', margin: '0 0 16px 0', textTransform: 'uppercase' }}>
            {isLocked ? `BLOQUEADO • REQUIERE ${activeRankDef.req} DÍAS` : `RANGO DESBLOQUEADO`}
          </p>
          
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 20px' }}>
            <div className="streak-badge" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)', background: `linear-gradient(135deg, ${activeRankDef.color2}33 0%, transparent 100%)`, marginBottom: '10px' }}>
              <Trophy size={16} color={activeRankDef.color1} />
              <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>RACHA ACTUAL: {currentStreak} DÍAS</span>
            </div>
            
            {nextRankReq && (
              <div style={{ width: '100%', maxWidth: '200px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>
                  <span>Progreso</span>
                  <span>{currentStreak} / {nextRankReq}</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (currentStreak / nextRankReq) * 100)}%`, height: '100%', background: `linear-gradient(90deg, ${activeRankDef.color1}, ${activeRankDef.color2})` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="action-buttons\""""

home = re.sub(old_rank_info, new_rank_info, home, flags=re.DOTALL)

with open(home_path, "w", encoding="utf-8") as f:
    f.write(home)
