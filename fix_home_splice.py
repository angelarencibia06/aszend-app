import os

path = "../aszend_app/src/pages/Home.jsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# I need to replace the entire top section.
# The section starts at: <div className="orb-header"
# And ends before: {/* ACTION BUTTONS */}
old_section = content[content.find('<div className="orb-header"'):content.find('{/* ACTION BUTTONS */}')]

new_section = """
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '40px', marginTop: '20px' }}>
        
        <div style={{ pointerEvents: 'none' }}>
          <EnergyOrb size={280} rankIndex={rankDef.id - 1} locked={false} animated={true} />
        </div>
        
        {/* Text Info */}
        <div style={{ textAlign: 'center', marginTop: '-30px', zIndex: 20, position: 'relative' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '4px', color: '#fff', margin: '0', textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
            {rankDef.name}
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'monospace', margin: '4px 0 24px 0', letterSpacing: '2px' }}>
            {rankDef.number}
          </p>
          
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            padding: '10px 24px', borderRadius: '99px', 
            border: `1px solid ${rankDef.mid}`, 
            backgroundColor: `${rankDef.mid}15`,
            color: rankDef.core,
            marginBottom: '32px',
            boxShadow: `0 0 15px ${rankDef.mid}20`
          }}>
            <Trophy size={18} />
            <span style={{ fontWeight: '800', fontSize: '16px', letterSpacing: '1px' }}>{currentStreak} DÍAS</span>
          </div>

          {nextRankReq && (
            <div style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#9ca3af', marginBottom: '8px', fontWeight: '500' }}>
                <span>Progreso a {nextRankName}</span>
                <span>{daysToNext} días más</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  background: `linear-gradient(90deg, ${rankDef.mid}, ${rankDef.core})`, 
                  width: `${progressPercent}%`, 
                  transition: 'width 1s ease-out',
                  boxShadow: `0 0 10px ${rankDef.core}` 
                }} />
              </div>
            </div>
          )}
        </div>
      </div>

      """

content = content.replace(old_section, new_section)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
