import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {  Shield, TrendingUp, Zap } from 'lucide-react';
import '../styles/App.css';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigate('/auth');
    }
  };

  const slides = [
    {
      title: 'El Problema Invisible',
      subtitle: 'El 80% de los hombres jóvenes consumen pornografía regularmente. Esta sobreestimulación destruye tu dopamina base, tu motivación y tu energía vital. No es un hábito inofensivo; es un ancla que te impide alcanzar tu verdadero potencial.',
      icon: <Shield size={60} color="#ef4444" />,
      color: '#ef4444'
    },
    {
      title: 'El Camino ASZEND',
      subtitle: 'Un desafío de 7 días diseñado para reiniciar tus receptores, construir disciplina de hierro y transmutar esa energía desperdiciada en trabajo profundo, entrenamiento y progreso real. Recupera tu tiempo.',
      icon: <TrendingUp size={60} color="var(--accent-neon)" />,
      color: 'var(--accent-neon)'
    },
    {
      title: 'Desbloquea tu Potencial',
      subtitle: 'Elige tu compromiso. Comienza con 7 días de prueba gratuita.',
      icon: <Zap size={60} color="#8b5cf6" />,
      color: '#8b5cf6',
      isPricing: true
    }
  ];

  const currentData = slides[step];

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0a0a0f', color: '#fff', padding: '20px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}
        >
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '25px', 
            background: `${currentData.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '30px', boxShadow: `0 0 30px ${currentData.color}30`
          }}>
            {currentData.icon}
          </div>
          
          <h1 style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'Oswald', margin: '0 0 15px 0' }}>{currentData.title}</h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 0 30px 0' }}>{currentData.subtitle}</p>

          {currentData.isPricing && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600' }}>Mensual</span>
                <span style={{ fontWeight: '800', color: 'var(--accent-neon)' }}>8€ / mes</span>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid var(--accent-neon)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-neon)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '10px' }}>
                  RECOMENDADO
                </div>
                <span style={{ fontWeight: '600' }}>Anual</span>
                <span style={{ fontWeight: '800', color: 'var(--accent-neon)' }}>20€ / año</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600' }}>Lifetime</span>
                <span style={{ fontWeight: '800', color: '#8b5cf6' }}>40€ único</span>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      <div style={{ padding: '20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '30px' }}>
          {slides.map((_, idx) => (
            <div key={idx} style={{ 
              width: idx === step ? '20px' : '8px', height: '8px', borderRadius: '4px', 
              background: idx === step ? currentData.color : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s'
            }} />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="primary-btn pulse-btn"
          style={{ width: '100%', padding: '18px', borderRadius: '15px', fontSize: '16px', fontWeight: 'bold', justifyContent: 'center' }}
        >
          {step === 2 ? 'Comenzar 7 días gratis' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
