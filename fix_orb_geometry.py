import os
import re

# ---------------------------------------------------------
# 1. FIX LANDING PAGE (App.tsx)
# ---------------------------------------------------------
landing_path = "../aszend_landing/src/App.tsx"
if os.path.exists(landing_path):
    with open(landing_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add the spin animations to the CSS block at the top of App.tsx
    if ".orb-spin" not in content:
        css_addition = """
      .orb-float { animation: orb-float 6s ease-in-out infinite; }
      .orb-pulse { animation: orb-pulse 4s ease-in-out infinite; }
      .orb-spin { animation: orb-spin 10s linear infinite; }
      .orb-spin-reverse { animation: orb-spin-reverse 15s linear infinite; }
      @keyframes orb-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes orb-pulse {
        0%, 100% { filter: brightness(1); transform: scale(1); }
        50% { filter: brightness(1.2); transform: scale(1.02); }
      }
      @keyframes orb-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes orb-spin-reverse {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
"""
        # Replace the old basic animations with the new block
        content = re.sub(r'\.orb-float \{.*?\}.*?@keyframes orb-pulse \{.*?\}', css_addition.strip(), content, flags=re.DOTALL)


    old_svg = """        {c.level >= 5 && <circle cx="140" cy="140" r="132" fill="none" stroke={c.mid} strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 10" className="ring-a" />}

        {c.level >= 2 && <ellipse cx="140" cy="140" rx="114" ry="30"
          fill="none" stroke={c.mid}  strokeWidth="1.5" strokeOpacity="0.45"
          className="ring-a" />}

        {c.level >= 3 && <ellipse cx="140" cy="140" rx="90" ry="22"
          fill="none" stroke={c.core} strokeWidth="1"   strokeOpacity="0.3"
          className="ring-b" />}

        {c.level >= 4 && <ellipse cx="140" cy="140" rx="70" ry="16"
          fill="none" stroke={c.core} strokeWidth="0.8" strokeOpacity="0.2"
          className="ring-c" />}

        <circle cx="140" cy="140" r="80" fill={c.mid} fillOpacity={c.level >= 4 ? 0.3 : 0.15} filter={`url(#${id}h)`} />
        {c.level >= 5 && <circle cx="140" cy="140" r="100" fill={c.core} fillOpacity="0.25" filter={`url(#${id}h)`} className="ring-c" />}"""

    new_svg = """        
        {/* LEVEL 2: Simple Ring */}
        {c.level === 2 && <ellipse cx="140" cy="140" rx="120" ry="30" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.7" transform="rotate(20 140 140)" />}
        
        {/* LEVEL 3: Double Crossed Rings */}
        {c.level === 3 && (
          <>
            <ellipse cx="140" cy="140" rx="120" ry="25" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.8" transform="rotate(35 140 140)" />
            <ellipse cx="140" cy="140" rx="120" ry="25" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.8" transform="rotate(-35 140 140)" />
          </>
        )}

        {/* LEVEL 4: Atomic Structure (3 Rings + Orbital Path) */}
        {c.level === 4 && (
          <>
            <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(0 140 140)" />
            <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(60 140 140)" />
            <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(120 140 140)" />
            <circle cx="140" cy="140" r="130" fill="none" stroke={c.core} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="5 15" className={animated ? "orb-spin" : ""} style={{ transformOrigin: '140px 140px' }} />
          </>
        )}

        {/* LEVEL 5: Sacred Geometry / Ascension (4 Rings + Outer Dash + Massive Aura) */}
        {c.level === 5 && (
          <>
            <ellipse cx="140" cy="140" rx="125" ry="15" fill="none" stroke={c.core} strokeWidth="3" strokeOpacity="1" transform="rotate(0 140 140)" />
            <ellipse cx="140" cy="140" rx="125" ry="15" fill="none" stroke={c.core} strokeWidth="3" strokeOpacity="1" transform="rotate(45 140 140)" />
            <ellipse cx="140" cy="140" rx="125" ry="15" fill="none" stroke={c.core} strokeWidth="3" strokeOpacity="1" transform="rotate(90 140 140)" />
            <ellipse cx="140" cy="140" rx="125" ry="15" fill="none" stroke={c.core} strokeWidth="3" strokeOpacity="1" transform="rotate(135 140 140)" />
            <circle cx="140" cy="140" r="135" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.6" strokeDasharray="10 20" className={animated ? "orb-spin-reverse" : ""} style={{ transformOrigin: '140px 140px' }} />
            <circle cx="140" cy="140" r="105" fill={c.core} fillOpacity="0.4" filter={`url(#${id}h)`} />
          </>
        )}

        <circle cx="140" cy="140" r="80" fill={c.mid} fillOpacity={c.level >= 4 ? 0.35 : 0.15} filter={`url(#${id}h)`} />"""

    content = content.replace(old_svg, new_svg)

    with open(landing_path, "w", encoding="utf-8") as f:
        f.write(content)


# ---------------------------------------------------------
# 2. FIX APP CSS (Home2.css) - Unique animations per ring!
# ---------------------------------------------------------
app_css = "../aszend_app/src/styles/Home2.css"
if os.path.exists(app_css):
    with open(app_css, "r", encoding="utf-8") as f:
        css = f.read()
    
    # Remove old keyframes and classes
    css = re.sub(r'/\* Progressive Orb Rings \*/.*', '', css, flags=re.DOTALL)
    
    # Add new robust animations
    css += """
/* Progressive Orb Rings */
.ring-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
}

.ring-1 {
  position: absolute;
  top: 50%; left: 50%;
  width: 150%; height: 40%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
}

.ring-2 {
  position: absolute;
  top: 50%; left: 50%;
  width: 150%; height: 40%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

.ring-3 {
  position: absolute;
  top: 50%; left: 50%;
  width: 150%; height: 40%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
}

.ring-4 {
  position: absolute;
  top: 50%; left: 50%;
  width: 150%; height: 40%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
}

.ring-halo {
  position: absolute;
  top: 50%; left: 50%;
  width: 180%; height: 180%;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.core-energy {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, rgba(255,255,255,0.9), transparent);
  border-radius: 50%;
  filter: blur(6px);
  z-index: 5;
}

/* Animations that don't overwrite each other's base transforms */
@keyframes spinRing1 {
  0% { transform: translate(-50%, -50%) rotateZ(20deg) rotateX(60deg) rotateY(0deg); }
  100% { transform: translate(-50%, -50%) rotateZ(20deg) rotateX(60deg) rotateY(360deg); }
}

@keyframes spinRing2 {
  0% { transform: translate(-50%, -50%) rotateZ(-40deg) rotateX(60deg) rotateY(0deg); }
  100% { transform: translate(-50%, -50%) rotateZ(-40deg) rotateX(60deg) rotateY(360deg); }
}

@keyframes spinRing3 {
  0% { transform: translate(-50%, -50%) rotateZ(80deg) rotateX(60deg) rotateY(0deg); }
  100% { transform: translate(-50%, -50%) rotateZ(80deg) rotateX(60deg) rotateY(360deg); }
}

@keyframes spinRing4 {
  0% { transform: translate(-50%, -50%) rotateZ(-80deg) rotateX(60deg) rotateY(0deg); }
  100% { transform: translate(-50%, -50%) rotateZ(-80deg) rotateX(60deg) rotateY(360deg); }
}

@keyframes spinHalo {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.anim-ring-1 { animation: spinRing1 8s linear infinite; }
.anim-ring-2 { animation: spinRing2 8s linear infinite; }
.anim-ring-3 { animation: spinRing3 8s linear infinite; }
.anim-ring-4 { animation: spinRing4 8s linear infinite; }
.anim-halo { animation: spinHalo 20s linear infinite; }
.pulsing-core { animation: pulseCore 2s ease-in-out infinite; }
"""
    with open(app_css, "w", encoding="utf-8") as f:
        f.write(css)

# ---------------------------------------------------------
# 3. FIX APP JSX (Home.jsx) to use new exact rings
# ---------------------------------------------------------
app_home = "../aszend_app/src/pages/Home.jsx"
if os.path.exists(app_home):
    with open(app_home, "r", encoding="utf-8") as f:
        content = f.read()

    # The block we added earlier
    old_sphere = """                        {/* Progressive complexity based on level */}
                        {!locked && rank.level >= 2 && <div className={`orbital-ring ring-1 ${i === activeIndex ? 'spinning-ring' : ''}`}></div>}
                        {!locked && rank.level >= 3 && <div className={`orbital-ring ring-2 ${i === activeIndex ? 'spinning-ring-reverse' : ''}`}></div>}
                        {!locked && rank.level >= 4 && <div className={`orbital-ring ring-3 ${i === activeIndex ? 'spinning-ring-fast' : ''}`}></div>}
                        {!locked && rank.level >= 5 && <div className={`core-energy ${i === activeIndex ? 'pulsing-core' : ''}`}></div>}"""

    new_sphere = """                        {/* Progressive complexity based on level */}
                        {!locked && rank.level === 2 && (
                          <div className={`ring-1 ${i === activeIndex ? 'anim-ring-1' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(20deg) rotateX(60deg)' }}></div>
                        )}
                        
                        {!locked && rank.level === 3 && (
                          <>
                            <div className={`ring-1 ${i === activeIndex ? 'anim-ring-1' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(20deg) rotateX(60deg)' }}></div>
                            <div className={`ring-2 ${i === activeIndex ? 'anim-ring-2' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(-40deg) rotateX(60deg)' }}></div>
                          </>
                        )}
                        
                        {!locked && rank.level === 4 && (
                          <>
                            <div className={`ring-1 ${i === activeIndex ? 'anim-ring-1' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(20deg) rotateX(60deg)' }}></div>
                            <div className={`ring-2 ${i === activeIndex ? 'anim-ring-2' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(-40deg) rotateX(60deg)' }}></div>
                            <div className={`ring-3 ${i === activeIndex ? 'anim-ring-3' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(80deg) rotateX(60deg)' }}></div>
                            <div className={`ring-halo ${i === activeIndex ? 'anim-halo' : ''}`} style={{ transform: 'translate(-50%, -50%)' }}></div>
                          </>
                        )}

                        {!locked && rank.level === 5 && (
                          <>
                            <div className={`ring-1 ${i === activeIndex ? 'anim-ring-1' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(20deg) rotateX(60deg)' }}></div>
                            <div className={`ring-2 ${i === activeIndex ? 'anim-ring-2' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(-40deg) rotateX(60deg)' }}></div>
                            <div className={`ring-3 ${i === activeIndex ? 'anim-ring-3' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(80deg) rotateX(60deg)' }}></div>
                            <div className={`ring-4 ${i === activeIndex ? 'anim-ring-4' : ''}`} style={{ transform: 'translate(-50%, -50%) rotateZ(-80deg) rotateX(60deg)' }}></div>
                            <div className={`ring-halo ${i === activeIndex ? 'anim-halo' : ''}`} style={{ transform: 'translate(-50%, -50%)', borderColor: 'rgba(255,255,255,0.6)' }}></div>
                            <div className={`core-energy ${i === activeIndex ? 'pulsing-core' : ''}`}></div>
                          </>
                        )}"""
    
    content = content.replace(old_sphere, new_sphere)
    with open(app_home, "w", encoding="utf-8") as f:
        f.write(content)

