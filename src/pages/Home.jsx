import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Trophy, Check, Info, LineChart, ChevronRight, Wind, Zap, Lock } from 'lucide-react';
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

  // Streak logic (Mocked to 365 for demo as requested by user)
  const [currentStreak, setCurrentStreak] = useState(365);
  useEffect(() => {
    // Keeping logic intact but state defaults to 365
    if (!lastCheckInDate) return;
    const last = new Date(lastCheckInDate);
    const now = new Date();
    const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    if (diff === 0 || diff === 1) {
      // setCurrentStreak(1); // disabled to keep 365 demo
    }
  }, [lastCheckInDate]);

  let highestUnlockedIndex = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (currentStreak >= RANKS[i].req) highestUnlockedIndex = i;
  }
  
  // Modals
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showRiskAnalysis, setShowRiskAnalysis] = useState(false);
  
  // Solar System selection logic
  const [viewIndex, setViewIndex] = useState(highestUnlockedIndex);

  const viewRank = RANKS[viewIndex] || RANKS[0];
  const isViewLocked = viewIndex > highestUnlockedIndex;

  // Smart progress logic
  let displayNextName = '';
  let displayDaysLeft = 0;
  let displayProgress = 0;
  let showProgress = false;

  if (isViewLocked) {
    // If they view an orb they haven't unlocked yet
    displayNextName = viewRank.name;
    displayDaysLeft = Math.max(0, viewRank.req - currentStreak);
    const prevReq = viewIndex > 0 ? RANKS[viewIndex - 1].req : 0;
    const progressRange = viewRank.req - prevReq;
    const currentProgress = currentStreak - prevReq;
    displayProgress = Math.min(100, Math.max(0, (currentProgress / progressRange) * 100));
    showProgress = true;
  } else if (viewIndex === highestUnlockedIndex && viewIndex < RANKS.length - 1) {
    // If they view the current active orb, and there is a next orb
    const nextRank = RANKS[viewIndex + 1];
    displayNextName = nextRank.name;
    displayDaysLeft = Math.max(0, nextRank.req - currentStreak);
    const prevReq = viewRank.req;
    const progressRange = nextRank.req - prevReq;
    const currentProgress = currentStreak - prevReq;
    displayProgress = Math.min(100, Math.max(0, (currentProgress / progressRange) * 100));
    showProgress = true;
  }

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
        
        {/* Solar System View */}
        <div style={{ marginBottom: '20px' }}>
          <EnergyOrb 
            size={340} 
            viewIndex={viewIndex}
            highestUnlockedIndex={highestUnlockedIndex}
            onSelectRank={(idx) => setViewIndex(idx)}
          />
        </div>
        
        <h1 className="rank-title">{viewRank.name}</h1>
        <p className="rank-number">{viewRank.number}</p>
        
        {isViewLocked ? (
          <div className="streak-pill" style={{ color: '#9ca3af', borderColor: '#4b5563' }}>
            <Lock size={16} />
            BLOQUEADO
          </div>
        ) : (
          <div className="streak-pill">
            <Trophy size={16} />
            {currentStreak} DÍAS
          </div>
        )}

        {showProgress && (
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
        
        <div className="habits-list-container">
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