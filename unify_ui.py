import os
import re

# 1. CREATE EnergyOrb.jsx
energy_orb_path = "../aszend_app/src/components/EnergyOrb.jsx"
energy_orb_content = """import React from 'react';

const RANKS = [
  { id: 1, name: 'PULSO', number: '01', core: '#93c5fd', mid: '#2563eb', outer: '#1e3a8a', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', core: '#c4b5fd', mid: '#7c3aed', outer: '#4c1d95', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', core: '#6ee7b7', mid: '#059669', outer: '#065f46', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', core: '#fdba74', mid: '#ea580c', outer: '#9a3412', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', core: '#fde68a', mid: '#d97706', outer: '#92400e', req: 365, level: 5 },
];

export function EnergyOrb({
  size = 280,
  rankIndex = 0,
  animated = true,
  className = "",
  locked = false
}) {
  const baseRank = RANKS[rankIndex] ?? RANKS[0];
  const c = locked 
    ? { core: '#6b7280', mid: '#374151', outer: '#111827', level: baseRank.level }
    : baseRank;
  
  const id = `o${rankIndex}x${size}`;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.7,
          height: size * 1.7,
          background: `radial-gradient(circle, ${c.mid}22 0%, transparent 68%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          position: 'absolute'
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 280 280"
        className={`relative z-10 ${animated && !locked ? "orb-float" : ""}`}
        style={{ position: 'relative', zIndex: 10, overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`${id}g`} cx="38%" cy="32%" r="65%">
            <stop offset="0%"   stopColor={c.core}  stopOpacity="1" />
            <stop offset="55%"  stopColor={c.mid}   stopOpacity="0.95" />
            <stop offset="100%" stopColor={c.outer}  stopOpacity="0.75" />
          </radialGradient>
          <filter id={`${id}f`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={`${id}h`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {!locked && (
          <>
            {/* LEVEL 2 */}
            {c.level === 2 && <ellipse cx="140" cy="140" rx="120" ry="30" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.7" transform="rotate(20 140 140)" />}
            
            {/* LEVEL 3 */}
            {c.level === 3 && (
              <>
                <ellipse cx="140" cy="140" rx="120" ry="25" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.8" transform="rotate(35 140 140)" />
                <ellipse cx="140" cy="140" rx="120" ry="25" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.8" transform="rotate(-35 140 140)" />
              </>
            )}

            {/* LEVEL 4 */}
            {c.level === 4 && (
              <>
                <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(0 140 140)" />
                <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(60 140 140)" />
                <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(120 140 140)" />
                <circle cx="140" cy="140" r="130" fill="none" stroke={c.core} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="5 15" className={animated ? "orb-spin" : ""} style={{ transformOrigin: '140px 140px' }} />
              </>
            )}

            {/* LEVEL 5 */}
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
          </>
        )}

        <circle cx="140" cy="140" r="80" fill={c.mid} fillOpacity={c.level >= 4 && !locked ? 0.35 : 0.15} filter={`url(#${id}h)`} />

        <circle cx="140" cy="140" r="75"
          fill={`url(#${id}g)`}
          filter={`url(#${id}f)`}
          className={animated && !locked ? "orb-pulse" : ""}
          style={{ transformOrigin: "140px 140px" }}
        />

        <ellipse cx="113" cy="111" rx="22" ry="14" fill="white" fillOpacity="0.18" />
        <ellipse cx="104" cy="104" rx="8"  ry="5"  fill="white" fillOpacity="0.28" />
        
        {locked && (
          <g transform="translate(128, 128) scale(1)">
            <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}
      </svg>
    </div>
  );
}
"""
with open(energy_orb_path, "w", encoding="utf-8") as f:
    f.write(energy_orb_content)

# 2. UPDATE index.css
index_css = "../aszend_app/src/index.css"
if os.path.exists(index_css):
    with open(index_css, "r", encoding="utf-8") as f:
        css = f.read()
    if ".orb-float" not in css:
        css += """
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
        with open(index_css, "w", encoding="utf-8") as f:
            f.write(css)

# 3. UPDATE Home.jsx TO USE EnergyOrb
home_path = "../aszend_app/src/pages/Home.jsx"
if os.path.exists(home_path):
    with open(home_path, "r", encoding="utf-8") as f:
        home = f.read()

    # Import EnergyOrb
    if "import { EnergyOrb }" not in home:
        home = home.replace("import { Lock, Shield", "import { EnergyOrb }\nfrom '../components/EnergyOrb';\nimport { Lock, Shield")
        home = home.replace("import { Lock, Shield } from 'lucide-react';", "import { Lock, Shield } from 'lucide-react';\nimport { EnergyOrb } from '../components/EnergyOrb';")

    old_sphere_block = r'<div className="sphere-wrapper">.*?</div>\s*</div>\s*</div>'
    # Actually let's use regex more carefully, or string replace
    # We replace <div className="sphere-wrapper">...</div>
    old_wrapper = re.search(r'<div className="sphere-wrapper">.*?{locked && \(.*?</Lock>.*?</div>\s*\)}.*?</div>.*?</div>', home, re.DOTALL)
    if old_wrapper:
        home = home.replace(old_wrapper.group(0), '<div className="sphere-wrapper"><EnergyOrb rankIndex={i} size={80} locked={locked} animated={i === activeIndex} /></div>')

    with open(home_path, "w", encoding="utf-8") as f:
        f.write(home)


# 4. REWRITE DailyCheckIn.jsx
checkin_path = "../aszend_app/src/components/DailyCheckIn.jsx"
checkin_content = """import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Zap, ArrowRight, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/CheckIn.css';

const QUESTIONS = [
  { id: 'sleep', title: '¿Cuánto has dormido?', options: ['<6h', '6-7h', '7-8h', '8h+'] },
  { id: 'training', title: '¿Has entrenado hoy?', options: ['Si', 'No'] },
  { id: 'deepwork', title: '¿Has completado tu Deep Work?', options: ['Si', 'No'] },
  { id: 'mood', title: '¿Cómo te sientes hoy?', options: ['Mal', 'Normal', 'Bien'] },
  { id: 'social', title: '¿Has usado mucho las redes sociales?', options: ['Si', 'No'] },
  { id: 'alone', title: '¿Estás solo ahora mismo?', options: ['Si', 'No'] }
];

const DailyCheckIn = ({ onClose, onComplete }) => {
  const { setDailyRisk, setRiskFactors, setLastCheckInDate, habits, habitLogs, setHabitsLogs } = useAppContext();
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSelect = (val) => {
    const q = QUESTIONS[step];
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    
    // Auto advance after short delay
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 350);
    }
  };

  const calculateRisk = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      let risk = 10;
      let factors = [];
      const todayStr = new Date().toLocaleDateString('sv-SE');
      const currentLogs = { ...(habitLogs[todayStr] || {}) };

      // Sleep
      if (answers.sleep === '<6h') { risk += 25; factors.push({ text: 'Dormiste poco', positive: false }); }
      else if (answers.sleep === '7-8h' || answers.sleep === '8h+') { risk -= 10; factors.push({ text: 'Buen descanso', positive: true }); }
      
      // Habits Sync
      const safeHabits = Array.isArray(habits) ? habits : [];
      safeHabits.forEach(h => {
        const name = h.name.toLowerCase();
        if (name.includes('dormir') && (answers.sleep === '7-8h' || answers.sleep === '8h+')) {
          currentLogs[h.id] = { completed: true, source: 'sync' };
        }
        if (name.includes('entrenar') && answers.training === 'Si') {
          currentLogs[h.id] = { completed: true, source: 'sync' };
        }
        if (name.includes('work') || name.includes('trabajo')) {
          if (answers.deepwork === 'Si') currentLogs[h.id] = { completed: true, source: 'sync' };
        }
      });

      // Mood
      if (answers.mood === 'Mal') { risk += 20; factors.push({ text: 'Bajo estado de ánimo', positive: false }); }
      else if (answers.mood === 'Bien') { risk -= 10; factors.push({ text: 'Buen estado de ánimo', positive: true }); }

      // Social
      if (answers.social === 'Si') { risk += 15; factors.push({ text: 'Alto consumo de redes', positive: false }); }
      
      // Alone
      if (answers.alone === 'Si') { risk += 15; factors.push({ text: 'Aislamiento', positive: false }); }
      else { risk -= 5; factors.push({ text: 'Entorno social activo', positive: true }); }

      if (risk > 90) risk = 90;
      if (risk < 5) risk = 5;

      setDailyRisk(risk);
      setRiskFactors(factors);
      setLastCheckInDate(todayStr);
      
      setHabitsLogs(prev => ({
        ...prev,
        [todayStr]: currentLogs
      }));
      
      setIsCalculating(false);
      onComplete();
    }, 1200);
  };

  const timeStr = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const isLastStep = step === QUESTIONS.length - 1;
  const currentQ = QUESTIONS[step];

  return (
    <div className="checkin-overlay">
      <motion.div 
        className="checkin-full-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="checkin-header">
          <button className="back-btn" onClick={() => step > 0 ? setStep(step - 1) : onClose()}>
            <ChevronLeft size={20} />
          </button>
          <h2 className="checkin-title">Control</h2>
          <div style={{ width: 36, textAlign: 'right', color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 'bold' }}>
            {step + 1}/{QUESTIONS.length}
          </div>
        </div>

        <div className="checkin-scroll-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          
          <div className="time-badge">
            <Zap size={14} /> {timeStr}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}
            >
              <h3 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', color: '#fff', margin: 0, lineHeight: '1.3' }}>
                {currentQ.title}
              </h3>
              
              <div className="options-row" style={{ flexDirection: currentQ.options.length > 2 ? 'column' : 'row' }}>
                {currentQ.options.map(opt => (
                  <button 
                    key={opt} 
                    className={`opt-pill ${answers[currentQ.id] === opt ? 'active' : ''}`}
                    onClick={() => handleSelect(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {isLastStep && answers[currentQ.id] && (
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="calculate-btn" 
              onClick={calculateRisk}
              disabled={isCalculating}
              style={{ marginTop: '40px' }}
            >
              {isCalculating ? 'SINCRONIZANDO...' : 'CALCULAR RIESGO'}
            </motion.button>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default DailyCheckIn;
"""
with open(checkin_path, "w", encoding="utf-8") as f:
    f.write(checkin_content)
