import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Headphones, Trophy, Check, Info, LineChart, ChevronRight, Wind, Zap, Lock, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { EnergyOrb } from '../components/EnergyOrb';
import DailyCheckIn from '../components/DailyCheckIn';
import RiskAnalysisModal from '../components/RiskAnalysisModal';
import MeditationModal from '../components/MeditationModal';
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
  const [showMeditation, setShowMeditation] = useState(false);
  
  // Carousel logic
  const [viewIndex, setViewIndex] = useState(highestUnlockedIndex);
  const orbScrollRef = React.useRef(null);
  
  // Initialize scroll position on mount
  useEffect(() => {
    if (orbScrollRef.current) {
      orbScrollRef.current.scrollLeft = highestUnlockedIndex * orbScrollRef.current.clientWidth;
    }
  }, [highestUnlockedIndex]);

  const handleOrbScroll = (e) => {
    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== viewIndex && newIndex >= 0 && newIndex < RANKS.length) {
        setViewIndex(newIndex);
      }
    }
  };

  const viewRank = RANKS[viewIndex] || RANKS[0];
  const isViewLocked = viewIndex > highestUnlockedIndex;
  



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
              <span>Progreso a {nextRankName}</span>
              <span>{daysToNext} días más</span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercent}%`, background: viewRank.core, boxShadow: `0 0 10px ${viewRank.core}` }} 
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons-row" style={{ display: 'flex', justifyContent: 'center', gap: '20px', width: '100%' }}>
            <div className="action-btn-wrapper">
              <button className="circle-btn" onClick={() => setShowMeditation(true)}>
                <Wind size={24} strokeWidth={1.5} />
              </button>
              <span className="action-label">Meditar</span>
            </div>
            <div className="action-btn-wrapper">
              <button className="circle-btn" onClick={() => alert("🎧 Los Sonidos Relajantes llegarán en la próxima actualización.")}>
                <Headphones size={24} strokeWidth={1.5} />
              </button>
              <span className="action-label">Sonidos</span>
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
        
        <div style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', color: '#60A5FA', margin: 0, lineHeight: 1.4 }}>
            <strong>Nota importante:</strong> Para que la IA pueda recalcular con exactitud tu riesgo de recaída, es vital que pulses el botón de "Check-in" diariamente.
          </p>
        </div>

        <div className="riesgo-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <p className="riesgo-text" style={{ flex: 1, paddingRight: '20px', margin: 0 }}>
            Estimación basada en hábitos, actividad reciente y patrones registrados.
          </p>
          <div className="riesgo-circle-wrapper" style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
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
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="wide-btn" onClick={() => setShowCheckIn(true)} style={{ flex: 1, background: '#2563EB', color: '#fff', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <Check size={16} /> Check-in
          </button>
          <button className="wide-btn" onClick={() => setShowRiskAnalysis(true)} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <LineChart size={16} /> Ver análisis
          </button>
        </div>
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

      {showCheckIn && <DailyCheckIn onClose={() => setShowCheckIn(false)} onComplete={() => setShowCheckIn(false)} />}
      <AnimatePresence>
        {showRiskAnalysis && <RiskAnalysisModal onClose={() => setShowRiskAnalysis(false)} />}
        {showMeditation && <MeditationModal onClose={() => setShowMeditation(false)} />}
      </AnimatePresence>

    </div>
  );
};

export default Home;