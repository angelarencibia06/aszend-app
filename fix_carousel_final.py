import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure ChevronLeft and ChevronRight are imported
if 'ChevronLeft' not in content:
    content = content.replace('import { Lock', 'import { Lock, ChevronLeft, ChevronRight')

# Find the Orb Section
start_idx = content.find('{/* Orb Section */}')
end_idx = content.find('{/* Action Buttons */}')

new_orb_section = '''{/* Orb Section */}
      <div className="orb-section">
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '180px', overflow: 'hidden', width: '100%' }}>
          
          <button onClick={() => setViewIndex(Math.max(0, viewIndex - 1))} style={{ position: 'absolute', left: '10px', zIndex: 10, background: 'transparent', border: 'none', color: '#3b82f6', opacity: viewIndex > 0 ? 1 : 0, transition: 'opacity 0.3s' }}>
            <ChevronLeft size={32} />
          </button>

          <div style={{ display: 'flex', gap: '30px', transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)', transform: `translateX(calc(50% - ${viewIndex * 110 + 40}px))`, width: 'max-content' }}>
            {RANKS.map((rank, idx) => {
              const isLocked = currentStreak < rank.req;
              return (
                <div 
                  key={rank.id} 
                  onClick={() => setViewIndex(idx)}
                  style={{ 
                    width: '80px', 
                    flexShrink: 0, 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: viewIndex === idx ? 1 : 0.3,
                    transform: `scale(${viewIndex === idx ? 1.6 : 0.8})`,
                    transition: 'all 0.4s ease',
                    cursor: 'pointer'
                  }}
                >
                  <EnergyOrb 
                    size={80} 
                    rankIndex={idx} 
                    locked={isLocked} 
                    animated={viewIndex === idx} 
                  />
                </div>
              );
            })}
          </div>
          
          <button onClick={() => setViewIndex(Math.min(RANKS.length - 1, viewIndex + 1))} style={{ position: 'absolute', right: '10px', zIndex: 10, background: 'transparent', border: 'none', color: '#3b82f6', opacity: viewIndex < RANKS.length - 1 ? 1 : 0, transition: 'opacity 0.3s' }}>
            <ChevronRight size={32} />
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
          {RANKS.map((_, idx) => (
            <div key={idx} style={{ width: '6px', height: '6px', borderRadius: '50%', background: viewIndex === idx ? '#3b82f6' : 'rgba(255,255,255,0.2)', transition: 'background 0.3s' }} />
          ))}
        </div>
        
        <h1 className="rank-title">{viewRank.name}</h1>
        <p className="rank-number">{viewRank.number}</p>
        
        {isViewLocked ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="streak-pill" style={{ color: '#9ca3af', borderColor: '#4b5563' }}>
              <Lock size={16} />
              BLOQUEADO
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Faltan {viewRank.req - currentStreak} días</span>
          </div>
        ) : (
          <div className="streak-pill">
            <Trophy size={16} />
            {currentStreak} DÍAS
          </div>
        )}

        {nextRankReq && viewIndex === highestUnlockedIndex && (
          <div className="progress-container">
            <div className="progress-labels">
              <span>Progreso a {displayNextName}</span>
              <span>{displayDaysLeft} días más</span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${displayProgress}%`, background: viewRank.core, boxShadow: `0 0 10px ${viewRank.core}` }} 
              />
            </div>
          </div>
        )}

        '''
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_orb_section + content[end_idx:]

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
