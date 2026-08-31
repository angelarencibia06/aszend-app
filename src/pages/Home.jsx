import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Trophy, Check } from 'lucide-react';
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



const Home = () => {
  const { 
    dailyRisk, 
    lastCheckInDate, 
    habits, 
    habitLogs, 
    setHabitsLogs,
    userProfile
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
  let riskColor = '#10b981'; // Green (default)
  let riskText = 'BAJO';
  if (riskValue > 40) { riskColor = '#f59e0b'; riskText = 'MEDIO'; }
  if (riskValue > 70) { riskColor = '#ef4444'; riskText = 'ALTO'; }

  // Greetings logic
  const hour = new Date().getHours();
  let greeting = 'Buenas noches';
  if (hour >= 6 && hour < 14) greeting = 'Buenos días';
  else if (hour >= 14 && hour < 20) greeting = 'Buenas tardes';

  return (
    <div className="page-container" style={{ backgroundColor: '#020617', paddingBottom: '120px', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* HEADER SECTION (As requested: Buenas tardes, Brian. Centro de Mando personal) */}
      <div style={{ padding: '24px 24px 0 24px', width: '100%', maxWidth: '400px', margin: '0 auto', zIndex: 30, position: 'relative' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>{greeting},</p>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>{userProfile?.name || 'Usuario'}.</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Centro de Mando personal</p>
      </div>

      {/* PLANETARY SYSTEM ORB (Inserted at the top of the old layout as requested) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '32px', marginTop: '20px' }}>
        
        <div style={{ pointerEvents: 'none' }}>
          <EnergyOrb size={260} rankIndex={rankDef.id - 1} locked={false} animated={true} />
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '-20px', zIndex: 20, position: 'relative' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '4px', color: '#fff', margin: '0', textShadow: `0 0 20px ${rankDef.mid}80` }}>
            {rankDef.name}
          </h1>
          <p style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'monospace', margin: '4px 0 16px 0', letterSpacing: '2px' }}>
            {rankDef.number}
          </p>
          
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            padding: '8px 20px', borderRadius: '99px', 
            border: `1px solid ${rankDef.mid}`, 
            backgroundColor: 'transparent',
            color: '#fff', 
            marginBottom: '24px',
            boxShadow: `0 0 10px ${rankDef.mid}30`
          }}>
            <Trophy size={16} color={rankDef.core} />
            <span style={{ fontWeight: '800', fontSize: '14px', letterSpacing: '1px' }}>{currentStreak} DÍAS</span>
          </div>

          {nextRankReq && (
            <div style={{ width: '100%', minWidth: '260px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '6px', fontWeight: '500' }}>
                <span>Progreso a {nextRankName}</span>
                <span>{daysToNext} días más</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  background: `linear-gradient(90deg, ${rankDef.mid}, ${rankDef.core})`, 
                  width: `${progressPercent}%`, 
                  transition: 'width 1s ease-out'
                }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIESGO DE RECAIDA (Old Design with Two Buttons Inside) */}
      <div style={{ background: '#0f1115', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', marginBottom: '16px', margin: '0 24px 16px 24px', position: 'relative', zIndex: 20 }}>
        <h2 style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
          RIESGO DE RECAÍDA
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0, lineHeight: 1.5, maxWidth: '60%' }}>
            Estimación basada en hábitos, actividad reciente y patrones registrados.
          </p>
          <div style={{ width: '90px', height: '90px', position: 'relative' }}>
            <svg width="90" height="90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={riskColor} strokeWidth="8"
                strokeDasharray={`${251.2 * (riskValue / 100)} 251.2`} strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', lineHeight: 1 }}>{riskValue}%</span>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: riskColor, marginTop: '4px', letterSpacing: '1px' }}>{riskText}</span>
            </div>
          </div>
        </div>
        
        <p style={{ fontSize: '14px', color: '#d1d5db', margin: '0 0 16px 0' }}>Tu riesgo está bajo control.</p>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowRiskAnalysis(true)} style={{ flex: 1, background: '#1f2937', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            Ver análisis
          </button>
          <button onClick={() => setShowCheckIn(true)} style={{ flex: 1, background: '#3b82f6', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            Check-in
          </button>
        </div>
      </div>

      {/* HABITOS DE HOY (Old Design with Solid Blue Bar and 4/5 completed text) */}
      <div style={{ background: '#0f1115', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', margin: '0 24px 24px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>HÁBITOS DE HOY</h2>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{habitsPercent}%</span>
        </div>
        
        {/* Progress Bar */}
        <div style={{ height: '6px', background: '#1f2937', borderRadius: '3px', width: '100%', marginBottom: '16px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#3b82f6', width: `${habitsPercent}%`, borderRadius: '3px', transition: 'width 0.5s ease-out' }} />
        </div>
        
        <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 20px 0' }}>
          {completedHabitsCount}/{activeHabits.length} completados
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {activeHabits.map(habit => (
            <div key={habit.id} onClick={() => toggleHabit(habit.id)} style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
              <div style={{ 
                width: '24px', height: '24px', borderRadius: '6px', 
                background: isCompleted(habit.id) ? '#3b82f6' : 'transparent',
                border: `2px solid ${isCompleted(habit.id) ? '#3b82f6' : '#374151'}`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                {isCompleted(habit.id) && <Check size={16} color="#fff" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: '16px', color: '#d1d5db' }}>{habit.name}</span>
            </div>
          ))}
          {activeHabits.length === 0 && (
             <span style={{ fontSize: '14px', color: '#6b7280' }}>No tienes hábitos activos.</span>
          )}
        </div>
        
        <button style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: 'bold', padding: 0, cursor: 'pointer' }}>
          Ver todos los hábitos →
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