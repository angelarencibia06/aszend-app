import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/CheckIn.css';

const QUESTIONS = [
  { id: 'sleep', title: '¿Cuánto has dormido?', options: ['<6h', '6-7h', '7-8h', '8h+'] },
  { id: 'training', title: '¿Has entrenado hoy?', options: ['Si', 'No'] },
  { id: 'deepwork', title: '¿Has completado tu Deep Work?', options: ['Si', 'No'] },
  { id: 'mood', title: '¿Cómo te sientes hoy?', options: ['Mal', 'Normal', 'Bien'] },
  { id: 'social', title: '¿Has usado mucho las redes sociales?', options: ['Si', 'No'] },
  { id: 'alone', title: '¿Estás solo ahora mismo?', options: ['Si', 'No'] }
];

const DailyCheckIn = ({ onClose, onComplete }) => {
  const { setDailyRisk, setRiskFactors, setLastCheckInDate, habits, habitLogs, setHabitsLogs } = useAppContext();
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSelect = (val) => {
    const q = QUESTIONS[step];
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    
    // Auto advance after short delay
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 350);
    }
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
        if (name.includes('entrenar') && answers.training === 'Si') {
          currentLogs[h.id] = { completed: true, source: 'sync' };
        }
        if (name.includes('work') || name.includes('trabajo')) {
          if (answers.deepwork === 'Si') currentLogs[h.id] = { completed: true, source: 'sync' };
        }
      });

      // Mood
      if (answers.mood === 'Mal') { risk += 20; factors.push({ text: 'Bajo estado de ánimo', positive: false }); }
      else if (answers.mood === 'Bien') { risk -= 10; factors.push({ text: 'Buen estado de ánimo', positive: true }); }

      // Social
      if (answers.social === 'Si') { risk += 15; factors.push({ text: 'Alto consumo de redes', positive: false }); }
      
      // Alone
      if (answers.alone === 'Si') { risk += 15; factors.push({ text: 'Aislamiento', positive: false }); }
      else { risk -= 5; factors.push({ text: 'Entorno social activo', positive: true }); }

      if (risk > 90) risk = 90;
      if (risk < 5) risk = 5;

      setDailyRisk(risk);
      setRiskFactors(factors);
      setLastCheckInDate(todayStr);
      
      setHabitsLogs(prev => ({
        ...prev,
        [todayStr]: currentLogs
      }));
      
      setIsCalculating(false);
      onComplete();
    }, 1200);
  };

  const timeStr = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const isLastStep = step === QUESTIONS.length - 1;
  const currentQ = QUESTIONS[step];

  return (
    <div className="checkin-overlay">
      <motion.div 
        className="checkin-full-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="checkin-header">
          <button className="back-btn" onClick={() => step > 0 ? setStep(step - 1) : onClose()}>
            <ChevronLeft size={20} />
          </button>
          <h2 className="checkin-title">Control</h2>
          <div style={{ width: 36, textAlign: 'right', color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 'bold' }}>
            {step + 1}/{QUESTIONS.length}
          </div>
        </div>

        <div className="checkin-scroll-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          
          <div className="time-badge">
            <Zap size={14} /> {timeStr}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}
            >
              <h3 style={{ fontSize: '22px', fontWeight: '800', textAlign: 'center', color: '#fff', margin: 0, lineHeight: '1.3' }}>
                {currentQ.title}
              </h3>
              
              <div className="options-row" style={{ flexDirection: currentQ.options.length > 2 ? 'column' : 'row' }}>
                {currentQ.options.map(opt => (
                  <button 
                    key={opt} 
                    className={`opt-pill ${answers[currentQ.id] === opt ? 'active' : ''}`}
                    onClick={() => handleSelect(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {isLastStep && answers[currentQ.id] && (
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="calculate-btn" 
              onClick={calculateRisk}
              disabled={isCalculating}
              style={{ marginTop: '40px' }}
            >
              {isCalculating ? 'SINCRONIZANDO...' : 'CALCULAR RIESGO'}
            </motion.button>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default DailyCheckIn;
