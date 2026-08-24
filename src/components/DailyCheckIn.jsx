import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/CheckIn.css';

const DailyCheckIn = ({ onClose, onComplete }) => {
  const { setDailyRisk, setRiskFactors, setLastCheckInDate, habits, habitLogs, setHabitsLogs } = useAppContext();
  
  const [answers, setAnswers] = useState({
    sleep: null,
    training: null,
    deepwork: null,
    mood: null,
    social: null,
    alone: null
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const handleSelect = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
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
        if (name.includes('entrenar') && answers.training === 'si') {
          currentLogs[h.id] = { completed: true, source: 'sync' };
        }
        if (name.includes('work') || name.includes('trabajo')) {
          if (answers.deepwork === 'si') currentLogs[h.id] = { completed: true, source: 'sync' };
        }
      });

      if (answers.training === 'no') { risk += 15; factors.push({ text: 'Falta de entrenamiento', positive: false }); }
      else { risk -= 5; factors.push({ text: 'Entrenaste hoy', positive: true }); }

      if (answers.deepwork === 'no') { risk += 10; factors.push({ text: 'Procrastinación', positive: false }); }
      else { risk -= 10; factors.push({ text: 'Deep Work completado', positive: true }); }

      if (answers.mood === 'bajo') { risk += 20; factors.push({ text: 'Estado de ánimo bajo', positive: false }); }
      else if (answers.mood === 'alto') { risk -= 5; factors.push({ text: 'Estado de ánimo estable', positive: true }); }

      if (answers.social === 'si') { risk += 20; factors.push({ text: 'Alta exposición a dopamina', positive: false }); }
      else { risk -= 5; factors.push({ text: 'Pocas distracciones digitales', positive: true }); }

      if (answers.alone === 'si') { risk += 15; factors.push({ text: 'Aislamiento', positive: false }); }
      
      // Enforce bounds
      if (risk < 0) risk = 5;
      if (risk > 95) risk = 95;

      setDailyRisk(risk);
      setRiskFactors(factors);
      setLastCheckInDate(todayStr);
      setHabitsLogs(prev => ({ ...prev, [todayStr]: currentLogs }));
      
      setIsCalculating(false);
      onComplete(); // This should trigger the RiskAnalysis view in the parent
    }, 1500);
  };

  const isAllAnswered = Object.values(answers).every(val => val !== null);

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  if (isCalculating) {
    return (
      <div className="checkin-overlay">
        <div className="checkin-full-modal">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Zap size={64} color="var(--accent-neon)" />
            </motion.div>
            <h2 style={{ marginTop: '20px', fontFamily: 'Oswald' }}>Calculando...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkin-overlay">
      <motion.div 
        className="checkin-full-modal"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="checkin-header">
          <button className="back-btn" onClick={onClose}><ChevronLeft size={24} /></button>
          <h2 className="checkin-title">Check-in</h2>
          <div style={{ width: 24 }}></div>
        </div>

        <div className="checkin-scroll-content">
          <p className="checkin-subtitle">Responde unas preguntas para actualizar tu riesgo estimado.</p>
          
          <div className="time-badge">
            <Zap size={14} /> Hora actual: {timeStr}
          </div>

          <div className="questions-list">
            
            {/* Q1 */}
            <div className="question-block">
              <label>Cuanto has dormido?</label>
              <div className="options-row">
                {['<6h', '6-7h', '7-8h', '8h+'].map(opt => (
                  <button 
                    key={opt} 
                    className={`opt-pill ${answers.sleep === opt ? 'active' : ''}`}
                    onClick={() => handleSelect('sleep', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="question-block">
              <label>Has entrenado hoy?</label>
              <div className="options-row">
                <button className={`opt-pill ${answers.training === 'si' ? 'active' : ''}`} onClick={() => handleSelect('training', 'si')}>Si</button>
                <button className={`opt-pill ${answers.training === 'no' ? 'active' : ''}`} onClick={() => handleSelect('training', 'no')}>No</button>
              </div>
            </div>

            {/* Q3 */}
            <div className="question-block">
              <label>Has completado tu Deep Work?</label>
              <div className="options-row">
                <button className={`opt-pill ${answers.deepwork === 'si' ? 'active' : ''}`} onClick={() => handleSelect('deepwork', 'si')}>Si</button>
                <button className={`opt-pill ${answers.deepwork === 'no' ? 'active' : ''}`} onClick={() => handleSelect('deepwork', 'no')}>No</button>
              </div>
            </div>

            {/* Q4 */}
            <div className="question-block">
              <label>Como te sientes hoy?</label>
              <div className="options-row">
                <button className={`opt-pill ${answers.mood === 'bajo' ? 'active' : ''}`} onClick={() => handleSelect('mood', 'bajo')}>Bajo</button>
                <button className={`opt-pill ${answers.mood === 'normal' ? 'active' : ''}`} onClick={() => handleSelect('mood', 'normal')}>Normal</button>
                <button className={`opt-pill ${answers.mood === 'alto' ? 'active' : ''}`} onClick={() => handleSelect('mood', 'alto')}>Alto</button>
              </div>
            </div>

            {/* Q5 */}
            <div className="question-block">
              <label>Has usado mucho las redes sociales?</label>
              <div className="options-row">
                <button className={`opt-pill ${answers.social === 'si' ? 'active' : ''}`} onClick={() => handleSelect('social', 'si')}>Si</button>
                <button className={`opt-pill ${answers.social === 'no' ? 'active' : ''}`} onClick={() => handleSelect('social', 'no')}>No</button>
              </div>
            </div>

            {/* Q6 */}
            <div className="question-block">
              <label>Estas solo ahora mismo?</label>
              <div className="options-row">
                <button className={`opt-pill ${answers.alone === 'si' ? 'active' : ''}`} onClick={() => handleSelect('alone', 'si')}>Si</button>
                <button className={`opt-pill ${answers.alone === 'no' ? 'active' : ''}`} onClick={() => handleSelect('alone', 'no')}>No</button>
              </div>
            </div>

          </div>

          <button 
            className="calculate-btn pulse-btn"
            disabled={!isAllAnswered}
            onClick={calculateRisk}
          >
            Calcular mi riesgo
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyCheckIn;
