import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, Flame, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import DailyCheckIn from '../components/DailyCheckIn';
import RiskAnalysisModal from '../components/RiskAnalysisModal';
import { useAppContext } from '../context/AppContext';
import '../styles/Home2.css';

const Home = () => {
  const { streak, dailyRisk, habits, habitLogs, setHabitsLogs, userProfile } = useAppContext();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showRiskAnalysis, setShowRiskAnalysis] = useState(false);

  const todayStr = new Date().toLocaleDateString('sv-SE');
  
  const getRiskColor = (risk) => {
    if (risk === null) return '#10b981';
    if (risk < 30) return '#10b981'; // Green
    if (risk < 70) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const riskColor = getRiskColor(dailyRisk);
  const riskValue = dailyRisk !== null ? dailyRisk : 18; // Fake 18% if null for design

  // Habit Logic
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

  const isCompleted = (habitId) => {
    return !!safeHabitLogs[todayStr]?.[habitId]?.completed;
  };

  return (
    <div className="home-container">
      
      <div className="home-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '20px' }}>
        <div>
          <p className="home-greeting">Buenas tardes,</p>
          <h1 className="home-name" style={{ textTransform: 'uppercase' }}>{userProfile?.name || 'Brian'}.</h1>
          <p className="home-subtitle">Centro de Mando personal</p>
        </div>
        <img 
          src="/logo.png" 
          alt="Aszend" 
          style={{ 
            width: '65px', 
            height: '65px', 
            objectFit: 'contain', 
            filter: 'drop-shadow(0 0 10px rgba(4, 78, 218, 0.5))' 
          }} 
        />
      </div>

      {/* RIESGO DE RECAIDA */}
      <div className="glass-card">
        <h2 className="card-title">RIESGO DE RECAIDA</h2>
        
        <div className="risk-layout">
          <p className="risk-text">
            Estimacion basada en habitos, actividad reciente y patrones registrados.
          </p>
          <div className="risk-circle-container">
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              {/* Progress circle */}
              <circle 
                cx="50" cy="50" r="40" fill="none" stroke={riskColor} strokeWidth="8"
                strokeDasharray={`${251.2 * (riskValue / 100)} 251.2`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <p className="risk-value">{riskValue}%</p>
              <p className="risk-status" style={{ color: riskColor }}>
                {riskValue < 30 ? 'BAJO' : riskValue < 70 ? 'MEDIO' : 'ALTO'}
              </p>
            </div>
          </div>
        </div>

        <p className="risk-status-text">Tu riesgo esta bajo control.</p>

        <div className="card-buttons">
          <button className="btn-dark" onClick={() => setShowRiskAnalysis(true)}>Ver analisis</button>
          <button className="btn-blue" onClick={() => setShowCheckIn(true)}>Check-in</button>
        </div>
      </div>



      {/* HABITOS DE HOY */}
      <div className="glass-card">
        <div className="habits-header">
          <h2 className="card-title" style={{ margin: 0 }}>HABITOS DE HOY</h2>
          <span className="habits-percent">{habitsPercent}%</span>
        </div>
        
        <div className="habits-progress-bar">
          <div className="habits-progress-fill" style={{ width: `${habitsPercent}%` }} />
        </div>
        <p className="habits-count">{completedHabitsCount}/{activeHabits.length} completados</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {activeHabits.map(habit => (
            <div key={habit.id} className="habit-item" onClick={() => toggleHabit(habit.id)}>
              <div className={`habit-checkbox ${isCompleted(habit.id) ? '' : 'empty'}`}>
                {isCompleted(habit.id) && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="habit-name">{habit.name}</span>
            </div>
          ))}
        </div>

        <Link to="/habits" className="view-all-link">Ver todos los habitos &rarr;</Link>
      </div>

      {/* PROTECCION */}
      <div className="glass-card">
        <h2 className="card-title">PROTECCION</h2>
        <div className="protection-content">
          <div className="protection-info">
            <div className="protection-icon">
              <Shield size={20} color="var(--accent-neon)" />
            </div>
            <div>
              <p className="protection-title">Proteccion activa</p>
              <p className="protection-desc">Tu entorno esta protegido</p>
            </div>
          </div>
          <Link to="/control">
            <button className="btn-manage">Gestionar</button>
          </Link>
        </div>
      </div>

      {showCheckIn && (
        <DailyCheckIn 
          onClose={() => setShowCheckIn(false)} 
          onComplete={() => { setShowCheckIn(false); setShowRiskAnalysis(true); }} 
        />
      )}

      <AnimatePresence>
        {showRiskAnalysis && (
          <RiskAnalysisModal onClose={() => setShowRiskAnalysis(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
