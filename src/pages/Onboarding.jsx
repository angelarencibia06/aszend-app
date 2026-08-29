import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Battery, Flame, Shield, TrendingUp, Zap, Check } from 'lucide-react';
import '../styles/App.css';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('anual'); // 'mensual' | 'anual'
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigate('/auth');
    }
  };

  const slide1 = (
    <div className="onboarding-slide">
      <div className="icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)' }}>
        <Brain size={48} color="#ef4444" />
      </div>
      <h1 className="slide-title">LA EPIDEMIA <span style={{ color: '#ef4444' }}>SILENCIOSA</span></h1>
      <p className="slide-desc">La sobreestimulación digital está destruyendo tus receptores de dopamina.</p>
      
      <div className="stats-container">
        <motion.div className="stat-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Battery size={20} color="#ef4444" />
          <div className="stat-text">
            <h4>-64%</h4>
            <span>Fuga de energía vital diaria</span>
          </div>
        </motion.div>
        
        <motion.div className="stat-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Brain size={20} color="#f59e0b" />
          <div className="stat-text">
            <h4>Niebla Mental</h4>
            <span>Dificultad de concentración profunda</span>
          </div>
        </motion.div>
        
        <motion.div className="stat-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <TrendingUp size={20} color="#3b82f6" />
          <div className="stat-text">
            <h4>Motivación Nula</h4>
            <span>Picos de dopamina artificiales</span>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const slide2 = (
    <div className="onboarding-slide">
      <div className="icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' }}>
        <Zap size={48} color="#3b82f6" />
      </div>
      <h1 className="slide-title">EL PROTOCOLO <span style={{ color: '#3b82f6' }}>ASZEND</span></h1>
      <p className="slide-desc">Un sistema basado en datos reales para transmutar tu energía desperdiciada.</p>
      
      <div className="benefits-container">
        <motion.div className="benefit-row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="benefit-icon"><Shield size={18} /></div>
          <span>Bloqueo a nivel de sistema nativo</span>
        </motion.div>
        <motion.div className="benefit-row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="benefit-icon"><Flame size={18} /></div>
          <span>Reseteo de dopamina en 7 días</span>
        </motion.div>
        <motion.div className="benefit-row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="benefit-icon"><TrendingUp size={18} /></div>
          <span>Construcción de disciplina férrea</span>
        </motion.div>
      </div>
    </div>
  );

  const slide3 = (
    <div className="onboarding-slide">
      <div className="icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)', boxShadow: '0 0 30px rgba(139, 92, 246, 0.2)' }}>
        <Shield size={48} color="#8b5cf6" />
      </div>
      <h1 className="slide-title">RECUPERA EL <span style={{ color: '#8b5cf6' }}>CONTROL</span></h1>
      <p className="slide-desc">Invierte en tu versión más disciplinada. Acceso total a todas las herramientas.</p>
      
      <div className="pricing-container">
        <div 
          className={`price-card ${selectedPlan === 'mensual' ? 'selected' : ''}`}
          onClick={() => setSelectedPlan('mensual')}
        >
          <div className="radio-circle">{selectedPlan === 'mensual' && <div className="radio-dot" />}</div>
          <div className="price-info">
            <span className="price-title">Plan Mensual</span>
            <span className="price-cost">10€ <small>/ mes</small></span>
          </div>
        </div>

        <div 
          className={`price-card ${selectedPlan === 'anual' ? 'selected highlight' : ''}`}
          onClick={() => setSelectedPlan('anual')}
        >
          <div className="recommended-badge">MEJOR VALOR</div>
          <div className="radio-circle">{selectedPlan === 'anual' && <div className="radio-dot" />}</div>
          <div className="price-info">
            <span className="price-title">Plan Anual</span>
            <span className="price-cost">20€ <small>/ año</small></span>
          </div>
        </div>
      </div>
    </div>
  );

  const slides = [slide1, slide2, slide3];
  const colors = ['#ef4444', '#3b82f6', '#8b5cf6'];

  return (
    <div className="page-container onboarding-page">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="slide-wrapper"
        >
          {slides[step]}
        </motion.div>
      </AnimatePresence>

      <div className="onboarding-footer">
        <div className="progress-dots">
          {[0, 1, 2].map((idx) => (
            <div 
              key={idx} 
              className={`dot ${idx === step ? 'active' : ''}`}
              style={{ background: idx === step ? colors[step] : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="primary-btn pulse-btn next-btn"
          style={{ background: colors[step] }}
        >
          {step === 2 ? 'Comenzar Transformación' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
