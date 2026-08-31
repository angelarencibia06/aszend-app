import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Trophy, Check, Info, LineChart, ChevronRight, Wind, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { EnergyOrb } from '../components/EnergyOrb';
import DailyCheckIn from '../components/DailyCheckIn';
import RiskAnalysisModal from '../components/RiskAnalysisModal';
import '../styles/HomeMockup.css';

const RANKS = [
  { id: 1, name: 'PULSO', number: '01', core: '#3b82f6', mid: '#2563eb', outer: '#1d4ed8', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', core: '#8b5cf6', mid: '#7c3aed', outer: '#5b21b6', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', core: '#10b981', mid: '#059669', outer: '#047857', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', core: '#f59e0b', mid: '#d97706', outer: '#b45309', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', core: '#f59e0b', mid: '#ea580c', outer: '#9a3412', req: 365, level: 5 },
];

const Home = () => {
  const { 
    dailyRisk, 
    lastCheckInDate, 
    habits, 
    habitLogs, 
    setHabitsLogs,
    userProfile,
    triggerPanicRoom
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

  // Modals
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showRiskAnalysis, setShowRiskAnalysis] = useState(false);

  // Habit Logic
  const todayStr = new Date().toISOString().split('T')[0];
  const safeHabits = Array.isArray(habits) ? habits : [];
  const safeHabitLogs = habitLogs || {};
  const activeHabits = safeHabits.filter(h => h.active);
  
  // If no habits exist, provide a fallback habit for UI mockup matching
  const displayHabits = activeHabits.length > 0 ? activeHabits : [{ id: 'mock1', name: 'Dormir > 7 horas' }];
  
  const todayLogs = safeHabitLogs[todayStr] || {};
  const completedHabitsCount = Object.values(todayLogs).filter(l => l.completed).length;
  const habitsPercent = activeHabits.length > 0 ? Math.round((completedHabitsCount / activeHabits.length) * 100) : 0;
  
  const toggleHabit = (habitId) => {
    if (habitId === 'mock1') return; // Don't toggle the mockup fallback
    const currentLogs = { ...(safeHabitLogs[todayStr] || {}) };
    const isCompleted = currentLogs[habitId]?.completed || false;
    currentLogs[habitId] = { completed: !isCompleted, source: 'manual' };
    setHabitsLogs(prev => ({ ...prev, [todayStr]: currentLogs }));
  };
  
  const isCompleted = (habitId) => !!safeHabitLogs[todayStr]?.[habitId]?.completed;

  // Risk Logic
  const riskValue = dailyRisk !== null ? dailyRisk : 18;
  let riskColor = '#10b981'; // Green
  if (riskValue > 40) riskColor = '#f59e0b';
  if (riskValue > 70) riskColor = '#ef4444';

  const hour = new Date().getHours();
  let greeting = 'Buenas noches';
  if (hour >= 6 && hour < 14) greeting = 'Buenos días';
  else if (hour >= 14 && hour < 20) greeting = 'Buenas tardes';

  return (
    <div className="premium-container">
      
      {/* Header */}
      <div className="premium-header">
        <div>
          <p className="premium-greeting">{greeting},</p>
          <h1 className="premium-username">{userProfile?.name || 'USUARIO'}.</h1>
        </div>
        <button className="power-btn">
          <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      </div>

      {/* Orb Section */}
      <div className="orb-section">
        <div style={{ pointerEvents: 'none', marginBottom: '10px' }}>
          <EnergyOrb size={260} rankIndex={rankDef.id - 1} locked={false} animated={true} />
        </div>
        
        <h1 className="rank-title">{rankDef.name}</h1>
        <p className="rank-number">{rankDef.number}</p>
        
        <div className="streak-pill">
          <Trophy size={16} />
          {currentStreak} DÍAS
        </div>

        {nextRankReq && (
          <div className="progress-container">
            <div className="progress-labels">
              <span>Progreso a {nextRankName}</span>
              <span>{daysToNext} días más</span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercent}%`, background: rankDef.core, boxShadow: `0 0 10px ${rankDef.core}` }} 
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons-row">
          <div className="action-btn-wrapper">
            <button className="circle-btn" onClick={() => setShowCheckIn(true)}>
              <Check size={24} strokeWidth={1.5} />
            </button>
            <span className="action-label">Check-in</span>
          </div>
          <div className="action-btn-wrapper">
            <button className="circle-btn">
              <Wind size={24} strokeWidth={1.5} />
            </button>
            <span className="action-label">Meditar</span>
          </div>
        </div>
      </div>

      {/* RIESGO DE RECAIDA */}
      <div className="premium-card">
        <div className="card-header-row" style={{ marginBottom: '12px' }}>
          <h2 className="card-title">
            RIESGO DE RECAÍDA
            <Info size={14} color="#6b7280" />
          </h2>
        </div>
        <div className="riesgo-content">
          <p className="riesgo-text">
            Estimación basada en hábitos, actividad reciente y patrones registrados.
          </p>
          <div className="riesgo-circle-wrapper">
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
        <button className="wide-btn" onClick={() => setShowRiskAnalysis(true)}>
          <LineChart size={16} />
          Ver análisis detallado
        </button>
      </div>

      {/* HÁBITOS DE HOY */}
      <div className="premium-card">
        <div className="card-header-row">
          <h2 className="card-title">HÁBITOS DE HOY</h2>
          <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>{habitsPercent}%</span>
        </div>
        
        <div>
          {displayHabits.map(habit => (
            <div key={habit.id} className="habit-item" onClick={() => toggleHabit(habit.id)}>
              <div className={`habit-checkbox ${isCompleted(habit.id) ? 'checked' : ''}`}>
                {isCompleted(habit.id) && <Check size={14} color="#fff" strokeWidth={3} />}
              </div>
              <span className="habit-name">{habit.name}</span>
              <ChevronRight size={18} className="habit-chevron" />
            </div>
          ))}
        </div>
      </div>

      {/* PROTOCOLO DE CONTROL */}
      <div className="protocolo-btn-container">
        <div className="protocolo-btn-glow"></div>
        <button className="protocolo-btn" onClick={triggerPanicRoom}>
          <Zap size={18} strokeWidth={2.5} />
          ACTIVAR PROTOCOLO DE CONTROL
        </button>
      </div>

      {showCheckIn && <DailyCheckIn onClose={() => setShowCheckIn(false)} onComplete={() => setShowCheckIn(false)} />}
      <AnimatePresence>
        {showRiskAnalysis && <RiskAnalysisModal onClose={() => setShowRiskAnalysis(false)} />}
      </AnimatePresence>

    </div>
  );
};

export default Home;