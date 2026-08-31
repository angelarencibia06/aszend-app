import subprocess

old_content = subprocess.check_output(["git", "show", "d9d7f7b^:src/pages/Home.jsx"]).decode('utf-8')
start_idx = old_content.find('{/* ACTION BUTTONS */}')
bottom_section = old_content[start_idx:]

new_top_section = """import React, { useState, useEffect } from 'react';
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

      """

with open("../aszend_app/src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(new_top_section + bottom_section)
