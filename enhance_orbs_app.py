import os
import re

app_home_path = "../aszend_app/src/pages/Home.jsx"

with open(app_home_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the inner sphere rendering
old_sphere = """                      <div 
                        className={`sphere ${i === activeIndex ? 'animated-sphere' : ''}`} 
                        style={{ 
                          background: `radial-gradient(circle at 35% 35%, ${locked ? '#4b5563' : rank.color1}, ${locked ? '#1f2937' : rank.color2})`,
                          boxShadow: (i === activeIndex && !locked) ? `0 0 35px ${rank.shadow}, inset -10px -10px 20px rgba(0,0,0,0.5)` : `inset -5px -5px 10px rgba(0,0,0,0.5)`
                        }}
                      >
                        <div className={`orbital-ring ${i === activeIndex ? 'spinning-ring' : ''}`}></div>
                        <div className="highlight"></div>
                        {locked && (
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, color: 'rgba(255,255,255,0.8)' }}>
                            <Lock size={24} />
                          </div>
                        )}
                      </div>"""

new_sphere = """                      <div 
                        className={`sphere level-${rank.level} ${i === activeIndex ? 'animated-sphere' : ''}`} 
                        style={{ 
                          background: `radial-gradient(circle at 35% 35%, ${locked ? '#4b5563' : rank.color1}, ${locked ? '#1f2937' : rank.color2})`,
                          boxShadow: (i === activeIndex && !locked) ? `0 0 ${20 + rank.level*10}px ${rank.shadow}, inset -10px -10px 20px rgba(0,0,0,0.5)` : `inset -5px -5px 10px rgba(0,0,0,0.5)`
                        }}
                      >
                        {/* Progressive complexity based on level */}
                        {!locked && rank.level >= 2 && <div className={`orbital-ring ring-1 ${i === activeIndex ? 'spinning-ring' : ''}`}></div>}
                        {!locked && rank.level >= 3 && <div className={`orbital-ring ring-2 ${i === activeIndex ? 'spinning-ring-reverse' : ''}`}></div>}
                        {!locked && rank.level >= 4 && <div className={`orbital-ring ring-3 ${i === activeIndex ? 'spinning-ring-fast' : ''}`}></div>}
                        {!locked && rank.level >= 5 && <div className={`core-energy ${i === activeIndex ? 'pulsing-core' : ''}`}></div>}

                        <div className="highlight"></div>
                        
                        {locked && (
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, color: 'rgba(255,255,255,0.8)' }}>
                            <Lock size={24} />
                          </div>
                        )}
                      </div>"""

content = content.replace(old_sphere, new_sphere)

with open(app_home_path, "w", encoding="utf-8") as f:
    f.write(content)


css_path = "../aszend_app/src/styles/Home2.css"
with open(css_path, "a", encoding="utf-8") as f:
    f.write("""
/* Progressive Orb Rings */
.ring-1 {
  width: 150%;
  height: 40%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.ring-2 {
  width: 130%;
  height: 130%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-left: 2px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.5);
}
.ring-3 {
  width: 170%;
  height: 20%;
  border: 1px dashed rgba(255, 255, 255, 0.4);
}

.core-energy {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  background: radial-gradient(circle, rgba(255,255,255,0.9), transparent);
  border-radius: 50%;
  filter: blur(4px);
  z-index: 5;
}

@keyframes spinReverse {
  0% { transform: translate(-50%, -50%) rotate(0deg) rotateX(70deg) rotateY(30deg); }
  100% { transform: translate(-50%, -50%) rotate(-360deg) rotateX(70deg) rotateY(30deg); }
}

@keyframes spinFast {
  0% { transform: translate(-50%, -50%) rotate(0deg) rotateX(-50deg) rotateY(-40deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg) rotateX(-50deg) rotateY(-40deg); }
}

@keyframes pulseCore {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(1); opacity: 0.5; }
}

.spinning-ring-reverse {
  animation: spinReverse 12s linear infinite;
}

.spinning-ring-fast {
  animation: spinFast 8s linear infinite;
}

.pulsing-core {
  animation: pulseCore 2s ease-in-out infinite;
}
""")
