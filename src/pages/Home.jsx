import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, Trophy, Wind, Play, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import DailyCheckIn from '../components/DailyCheckIn';
import RiskAnalysisModal from '../components/RiskAnalysisModal';
import { useAppContext } from '../context/AppContext';
import '../styles/Home2.css';

const RANKS = [
  { id: 1, name: 'PULSO', number: '01', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', color1: '#fcd34d', color2: '#d97706', shadow: 'rgba(252, 211, 77, 0.5)', req: 365, level: 5 },
];

const Home = () => {
  const { streak, dailyRisk, lastCheckInDate, habits, habitLogs, setHabitsLogs, userProfile } = useAppContext();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showRiskAnalysis, setShowRiskAnalysis] = useState(false);
  
  const currentStreak = streak || 0;
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [showMeditate, setShowMeditate] = useState(false);
  const [meditateTime, setMeditateTime] = useState(180);
  const [isMeditating, setIsMeditating] = useState(false);

  useEffect(() => {
    let rankIdx = 0;
    for (let i = 0; i < RANKS.length; i++) {
      if (currentStreak >= RANKS[i].req) {
        rankIdx = i;
      }
    }
    setActiveIndex(rankIdx);
  }, [currentStreak]);

  const todayStr = new Date().toLocaleDateString('sv-SE');
  
  useEffect(() => {
    if (lastCheckInDate !== todayStr) {
      setShowCheckIn(true);
    }
  }, [lastCheckInDate, todayStr]);

  useEffect(() => {
    let interval;
    if (isMeditating && meditateTime > 0) {
      interval = setInterval(() => {
        setMeditateTime(prev => prev - 1);
      }, 1000);
    } else if (meditateTime === 0) {
      setIsMeditating(false);
    }
    return () => clearInterval(interval);
  }, [isMeditating, meditateTime]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getRiskColor = (risk) => {
    if (risk === null) return '#10b981';
    if (risk < 30) return '#10b981';
    if (risk < 70) return '#f59e0b';
    return '#ef4444';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Buenos días,';
    if (hour >= 12 && hour < 20) return 'Buenas tardes,';
    return 'Buenas noches,';
  };

  const riskColor = getRiskColor(dailyRisk);
  const riskValue = dailyRisk !== null ? dailyRisk : 18;

  const safeHabits = Array.isArray(habits) ? habits : [];
  const safeHabitLogs = habitLogs || {};
  const activeHabits = safeHabits.filter(h => h.active);
  const todayLogs = safeHabitLogs[todayStr] || {};
  const completedHabitsCount = Object.values(todayLogs).filter(l => l.completed).length;
  const habitsPercent = activeHabits.length > 0 ? Math.round((completedHabitsCount / activeHabits.length) * 100) : 0;

  const toggleHabit = (habitId) => {
    const currentLogs = { ...(safeHabitLogs[todayStr] || {}) };
    const isCompleted = currentLogs[habitId]?.completed || false;
    currentLogs[habitId] = { completed: !isCompleted, source: 'manual' };
    setHabitsLogs(prev => ({ ...prev, [todayStr]: currentLogs }));
  };

  const isCompleted = (habitId) => !!safeHabitLogs[todayStr]?.[habitId]?.completed;

  // Next rank logic
  let highestUnlockedIndex = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (currentStreak >= RANKS[i].req) {
      highestUnlockedIndex = i;
    }
  }

  const activeRankDef = RANKS[activeIndex];
  const isLocked = currentStreak < activeRankDef.req;
  const isActualCurrentRank = activeIndex === highestUnlockedIndex;
  
  let nextRankReq = null;
  let nextRankName = null;
  
  // Only show progress bar if they are viewing their ACTUAL current rank
  if (isActualCurrentRank && activeIndex < RANKS.length - 1) {
    nextRankReq = RANKS[activeIndex + 1].req;
    nextRankName = RANKS[activeIndex + 1].name;
  }

  const daysToNext = nextRankReq ? nextRankReq - currentStreak : 0;
  const progressPercent = nextRankReq ? Math.min(100, Math.max(0, ((currentStreak - activeRankDef.req) / (nextRankReq - activeRankDef.req)) * 100)) : 100;

  return (
    <div className="home-container">
      
      <div className="home-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '10px' }}>
        <div>
          <p className="home-greeting">{getGreeting()}</p>
          <h1 className="home-name" style={{ textTransform: 'uppercase' }}>{userProfile?.name || 'Usuario'}.</h1>
        </div>
        <img 
          src="/logo.png" 
          alt="Aszend" 
          style={{ width: '45px', height: '45px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(4, 78, 218, 0.5))' }} 
        />
      </div>

      {/* RANKS CAROUSEL SECTION */}
      <div className="ranks-section">
        <div className="carousel-container">
          {/* calc(50% - (index * 120 + 40)px) ensures PERFECT centering. 80px width orb -> half is 40px */}
          <div className="carousel-track" style={{ transform: `translateX(calc(50% - ${activeIndex * 120 + 40}px))` }}>
            {RANKS.map((rank, i) => {
              const locked = currentStreak < rank.req;
              return (
                <div 
                  key={rank.id} 
                  className={`carousel-item ${i === activeIndex ? 'active' : ''} ${locked ? 'locked' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  style={{ width: '80px', flexShrink: 0 }}
                >
                  <div className="sphere-wrapper">
                    <div 
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="rank-info" style={{ textAlign: 'center', marginTop: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px', color: isLocked ? '#9ca3af' : '#fff', margin: '0 0 4px 0' }}>
            {isLocked ? `BLOQUEADO: ${activeRankDef.name}` : activeRankDef.name}
          </h2>
          <p style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace', margin: '0 0 16px 0' }}>
            {activeRankDef.number} {isLocked ? `(Requiere ${activeRankDef.req} días)` : ''}
          </p>
          
          {!isLocked && (
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 20px' }}>
              <div className="streak-badge" style={{ color: activeRankDef.color1, borderColor: activeRankDef.color2, background: `${activeRankDef.color2}15`, marginBottom: '10px' }}>
                <Trophy size={16} />
                <span style={{ fontWeight: 'bold' }}>{currentStreak} DÍAS</span>
              </div>
              
              {nextRankReq && (
                <div style={{ width: '100%', maxWidth: '200px', marginTop: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9ca3af', marginBottom: '4px' }}>
                    <span>Progreso a {nextRankName}</span>
                    <span>{daysToNext} días más</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: activeRankDef.color1, width: `${progressPercent}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="quick-actions" style={{ marginBottom: '32px' }}>
        <button className="action-btn" onClick={() => setShowCheckIn(true)}>
          <div className="action-icon"><Check size={20} /></div>
          <span>Check-in</span>
        </button>
        <button className="action-btn" onClick={() => { setShowMeditate(true); setMeditateTime(180); setIsMeditating(false); }}>
          <div className="action-icon"><Wind size={20} /></div>
          <span>Meditar</span>
        </button>
      </div>

      {/* RIESGO DE RECAIDA */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h2 className="card-title">RIESGO DE RECAÍDA</h2>
        <div className="risk-layout">
          <p className="risk-text">Estimación basada en hábitos, actividad reciente y patrones registrados.</p>
          <div className="risk-circle-container">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={riskColor} strokeWidth="8"
                strokeDasharray={`${251.2 * (riskValue / 100)} 251.2`} strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <p className="risk-value">{riskValue}%</p>
            </div>
          </div>
        </div>
        <button className="btn-dark" style={{ width: '100%', marginTop: '16px' }} onClick={() => setShowRiskAnalysis(true)}>Ver análisis detallado</button>
      </div>

      {/* HABITOS DE HOY */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <div className="habits-header">
          <h2 className="card-title" style={{ margin: 0 }}>HÁBITOS DE HOY</h2>
          <span className="habits-percent">{habitsPercent}%</span>
        </div>
        <div className="habits-progress-bar">
          <div className="habits-progress-fill" style={{ width: `${habitsPercent}%` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '15px' }}>
          {activeHabits.map(habit => (
            <div key={habit.id} className="habit-item" onClick={() => toggleHabit(habit.id)}>
              <div className={`habit-checkbox ${isCompleted(habit.id) ? '' : 'empty'}`}>
                {isCompleted(habit.id) && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="habit-name">{habit.name}</span>
            </div>
          ))}
        </div>
      </div>

      {showCheckIn && <DailyCheckIn onClose={() => setShowCheckIn(false)} onComplete={() => setShowCheckIn(false)} />}
      <AnimatePresence>
        {showRiskAnalysis && <RiskAnalysisModal onClose={() => setShowRiskAnalysis(false)} />}
      </AnimatePresence>

      {/* MEDITATION MODAL */}
      <AnimatePresence>
        {showMeditate && (
          <motion.div 
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <button style={{ position: 'absolute', top: '32px', right: '32px', color: 'rgba(255,255,255,0.5)', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setShowMeditate(false)}>
              <X size={32} />
            </button>
            
            <motion.div 
              style={{ width: '192px', height: '192px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', position: 'relative', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(0,0,0,0) 70%)' }}
              animate={{ scale: isMeditating ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Wind size={64} color="#60a5fa" />
            </motion.div>
            
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Respiración Guiada</h3>
            <p style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '36px', marginBottom: '32px', letterSpacing: '4px' }}>{formatTime(meditateTime)}</p>
            
            {!isMeditating && meditateTime > 0 ? (
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#000', padding: '12px 32px', borderRadius: '9999px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', border: 'none', cursor: 'pointer' }} onClick={() => setIsMeditating(true)}>
                <Play size={18} /> Iniciar
              </button>
            ) : meditateTime === 0 ? (
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#2563eb', color: '#fff', padding: '12px 32px', borderRadius: '9999px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', border: 'none', cursor: 'pointer' }} onClick={() => setShowMeditate(false)}>
                Completado
              </button>
            ) : (
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', padding: '12px 32px', borderRadius: '9999px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }} onClick={() => setIsMeditating(false)}>
                Pausar
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
