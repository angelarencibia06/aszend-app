import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Check, Wind, X, Play } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { EnergyOrb } from '../components/EnergyOrb';
import DailyCheckIn from '../components/DailyCheckIn';
import RiskAnalysisModal from '../components/RiskAnalysisModal';
import '../styles/Home2.css';
import '../styles/App.css';

const RANKS = [
  { id: 1, name: 'PULSO', number: '01', core: '#3b82f6', mid: '#2563eb', outer: '#1d4ed8', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', core: '#8b5cf6', mid: '#7c3aed', outer: '#5b21b6', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', core: '#10b981', mid: '#059669', outer: '#047857', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', core: '#f59e0b', mid: '#d97706', outer: '#b45309', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', core: '#f59e0b', mid: '#ea580c', outer: '#9a3412', req: 365, level: 5 },
];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const Home = () => {
  const { 
    dailyRisk, 
    lastCheckInDate, 
    habits, 
    habitLogs, 
    setHabitsLogs 
  } = useAppContext();

  // Streak logic
  const [currentStreak, setCurrentStreak] = useState(0);
  useEffect(() => {
    if (!lastCheckInDate) return;
    const last = new Date(lastCheckInDate);
    const now = new Date();
    const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    if (diff === 0 || diff === 1) setCurrentStreak(1);
  }, [lastCheckInDate]);

  let highestUnlockedIndex = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (currentStreak >= RANKS[i].req) highestUnlockedIndex = i;
  }
  const activeIndex = highestUnlockedIndex;
  const rankDef = RANKS[activeIndex];
  
  let nextRankReq = null;
  let nextRankName = null;
  if (activeIndex < RANKS.length - 1) {
    nextRankReq = RANKS[activeIndex + 1].req;
    nextRankName = RANKS[activeIndex + 1].name;
  }

  const daysToNext = nextRankReq ? nextRankReq - currentStreak : 0;
  const progressPercent = nextRankReq ? Math.min(100, Math.max(0, ((currentStreak - rankDef.req) / (nextRankReq - rankDef.req)) * 100)) : 100;

  // Other state
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showRiskAnalysis, setShowRiskAnalysis] = useState(false);
  const [showMeditate, setShowMeditate] = useState(false);
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditateTime, setMeditateTime] = useState(180);

  useEffect(() => {
    let interval = null;
    if (isMeditating && meditateTime > 0) {
      interval = setInterval(() => setMeditateTime(t => t - 1), 1000);
    } else if (meditateTime === 0) {
      setIsMeditating(false);
    }
    return () => clearInterval(interval);
  }, [isMeditating, meditateTime]);

  // Habit Logic
  const todayStr = new Date().toISOString().split('T')[0];
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

  // Risk Logic
  const riskValue = dailyRisk !== null ? dailyRisk : 18;
  let riskColor = '#10b981';
  if (riskValue > 40) riskColor = '#f59e0b';
  if (riskValue > 70) riskColor = '#ef4444';

  return (
    <div className="page-container" style={{ backgroundColor: '#020617', paddingBottom: '100px' }}>
      
      {/* HEADER SECTION (New Orb Design) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '40px', marginTop: '20px' }}>
        
        <div style={{ pointerEvents: 'none' }}>
          <EnergyOrb size={280} rankIndex={rankDef.id - 1} locked={false} animated={true} />
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '-30px', zIndex: 20, position: 'relative' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '4px', color: '#fff', margin: '0', textShadow: `0 0 20px ${rankDef.mid}80` }}>
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
