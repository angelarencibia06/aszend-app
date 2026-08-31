import os

new_home = """import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Check, Wind, X, Play, Power, Info, ChevronRight, Zap } from 'lucide-react';
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
  let riskColor = '#10b981'; // Green (default)
  if (riskValue > 40) riskColor = '#f59e0b'; // Orange
  if (riskValue > 70) riskColor = '#ef4444'; // Red

  // Greetings logic
  const hour = new Date().getHours();
  let greeting = 'Buenas noches';
  if (hour >= 6 && hour < 14) greeting = 'Buenos días';
  else if (hour >= 14 && hour < 20) greeting = 'Buenas tardes';

  return (
    <div className="page-container" style={{ backgroundColor: '#020617', paddingBottom: '120px', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px 24px 0 24px', width: '100%', maxWidth: '400px', margin: '0 auto', zIndex: 30, position: 'relative' }}>
        <div>
          <p style={{ color: '#fff', fontSize: '14px', margin: 0, opacity: 0.9 }}>{greeting},</p>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '900', margin: 0, letterSpacing: '1px', textShadow: '0 0 15px rgba(59,130,246,0.8)' }}>{userProfile?.name?.toUpperCase() || 'USUARIO'}.</h1>
        </div>
        <button style={{ background: 'transparent', border: '2px solid #3b82f6', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', boxShadow: '0 0 15px rgba(59,130,246,0.5)', cursor: 'pointer' }}>
          <Power size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* PLANETARY SYSTEM ORB */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '32px', marginTop: '10px' }}>
        
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
            color: '#fff', // Changed to white as per screenshot
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

      {/* ACTION BUTTONS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '24px', zIndex: 20, position: 'relative' }}>
        <button onClick={() => setShowCheckIn(true)} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', backgroundColor: 'rgba(255,255,255,0.03)' }}>
            <Check size={24} strokeWidth={1.5} />
          </div>
          <span style={{ color: '#fff', fontSize: '12px', opacity: 0.9 }}>Check-in</span>
        </button>
        <button onClick={() => { setShowMeditate(true); setMeditateTime(180); setIsMeditating(false); }} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', backgroundColor: 'rgba(255,255,255,0.03)' }}>
            <Wind size={24} strokeWidth={1.5} />
          </div>
          <span style={{ color: '#fff', fontSize: '12px', opacity: 0.9 }}>Meditar</span>
        </button>
      </div>

      {/* RIESGO DE RECAIDA */}
      <div style={{ background: '#0f1115', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', marginBottom: '16px', margin: '0 24px 16px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ flex: 1, paddingRight: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              RIESGO DE RECAÍDA <Info size={14} color="#6b7280" />
            </h2>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0, lineHeight: 1.4 }}>Estimación basada en hábitos, actividad reciente y patrones registrados.</p>
          </div>
          <div style={{ width: '70px', height: '70px', position: 'relative' }}>
            <svg width="70" height="70" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={riskColor} strokeWidth="12"
                strokeDasharray={`${251.2 * (riskValue / 100)} 251.2`} strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{riskValue}%</span>
            </div>
          </div>
        </div>
        <button onClick={() => setShowRiskAnalysis(true)} style={{ width: '100%', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          Ver análisis detallado
        </button>
      </div>

      {/* HABITOS DE HOY */}
      <div style={{ background: '#0f1115', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', margin: '0 24px 24px 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: 0 }}>HÁBITOS DE HOY</h2>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{habitsPercent}%</span>
        </div>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%', marginBottom: '16px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeHabits.map(habit => (
            <div key={habit.id} onClick={() => toggleHabit(habit.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: `1px solid ${isCompleted(habit.id) ? '#3b82f6' : 'rgba(255,255,255,0.3)'}`, background: isCompleted(habit.id) ? '#3b82f6' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isCompleted(habit.id) && <Check size={14} color="#fff" strokeWidth={3} />}
                </div>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>{habit.name}</span>
              </div>
              <ChevronRight size={16} color="#6b7280" />
            </div>
          ))}
          {activeHabits.length === 0 && (
             <span style={{ fontSize: '13px', color: '#6b7280' }}>No tienes hábitos activos.</span>
          )}
        </div>
      </div>

      {/* ACTIVAR PROTOCOLO DE CONTROL */}
      <div style={{ padding: '0 24px', position: 'relative', zIndex: 20 }}>
        <button 
          onClick={triggerPanicRoom}
          style={{
            width: '100%',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '900',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}
        >
          <Zap size={18} fill="#ef4444" />
          ACTIVAR PROTOCOLO DE CONTROL
        </button>
      </div>

      {showCheckIn && <DailyCheckIn onClose={() => setShowCheckIn(false)} onComplete={() => setShowCheckIn(false)} />}
      <AnimatePresence>
        {showRiskAnalysis && <RiskAnalysisModal onClose={() => setShowRiskAnalysis(false)} />}
      </AnimatePresence>

      {/* MEDITATION MODAL */}
      <AnimatePresence>
        {showMeditate && (
          <motion.div 
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
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
"""

with open("../aszend_app/src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(new_home)
