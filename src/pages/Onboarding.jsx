import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Activity, Target, Zap, ShieldAlert, CheckCircle2, ChevronRight, Lock, Unlock, ArrowRight } from 'lucide-react';
import '../styles/App.css';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ freq: null, impact: null });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState('Analizando patrones de consumo...');
  const [selectedPlan, setSelectedPlan] = useState('anual');
  const navigate = useNavigate();

  const nextStep = () => setStep(s => s + 1);

  const handleFreqSelect = (val) => {
    setAnswers({ ...answers, freq: val });
    setTimeout(nextStep, 400);
  };

  const handleImpactSelect = (val) => {
    setAnswers({ ...answers, impact: val });
    startAnalysis();
  };

  const startAnalysis = () => {
    setStep(3); // Analyzing step
  };

  useEffect(() => {
    if (step === 3) {
      setAnalysisText('Analizando patrones de consumo...');
      const t1 = setTimeout(() => setAnalysisText('Evaluando desgaste del córtex prefrontal...'), 1500);
      const t2 = setTimeout(() => setAnalysisText('Calculando tiempo de reseteo de receptores D2...'), 3000);
      const t3 = setTimeout(() => setAnalysisText('Construyendo protocolo Aszend...'), 4500);
      
      const t4 = setTimeout(() => {
        setStep(4);
      }, 6000);
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [step]);

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="onboarding-content">
            <div className="hero-icon-container">
              <div className="hero-icon-glow" style={{ background: '#3b82f6' }}></div>
              <Target size={56} color="#3b82f6" style={{ position: 'relative', zIndex: 2 }} />
            </div>
            <h1 className="onboarding-heading">Es hora de tomar el control.</h1>
            <p className="onboarding-subtext">Vamos a personalizar tu protocolo de recuperación basándonos en tu neuroquímica actual.</p>
            <button className="onboarding-btn-primary" onClick={nextStep} style={{ marginTop: 'auto' }}>
              Comenzar Evaluación
            </button>
          </div>
        );

      case 1:
        return (
          <div className="onboarding-content">
            <span className="step-indicator">Paso 1 de 2</span>
            <h1 className="onboarding-heading" style={{ fontSize: '26px' }}>¿Con qué frecuencia sientes que el impulso te domina?</h1>
            <div className="options-grid">
              {['Diariamente', 'Varias veces por semana', 'Un par de veces al mes', 'Rara vez, pero me destruye'].map((opt) => (
                <div 
                  key={opt} 
                  className={`option-card ${answers.freq === opt ? 'selected' : ''}`}
                  onClick={() => handleFreqSelect(opt)}
                >
                  <span>{opt}</span>
                  <div className="radio-indicator">{answers.freq === opt && <div className="radio-fill" />}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="onboarding-content">
            <span className="step-indicator">Paso 2 de 2</span>
            <h1 className="onboarding-heading" style={{ fontSize: '26px' }}>¿Qué área de tu vida se ve más afectada después de una recaída?</h1>
            <div className="options-grid">
              {['Niebla mental y falta de concentración', 'Fatiga extrema y falta de energía', 'Ansiedad social y aislamiento', 'Pérdida de motivación por mis metas'].map((opt) => (
                <div 
                  key={opt} 
                  className={`option-card ${answers.impact === opt ? 'selected' : ''}`}
                  onClick={() => handleImpactSelect(opt)}
                >
                  <span>{opt}</span>
                  <div className="radio-indicator">{answers.impact === opt && <div className="radio-fill" />}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="onboarding-content center-all">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="spinner-outer"
            >
              <div className="spinner-inner"></div>
            </motion.div>
            <h2 className="analyzing-title">Personalizando Protocolo</h2>
            <p className="analyzing-text">{analysisText}</p>
          </div>
        );

      case 4:
        return (
          <div className="onboarding-content scrollable">
            <h1 className="onboarding-heading" style={{ fontSize: '28px', color: '#ef4444' }}>La Cruda Realidad</h1>
            <p className="onboarding-subtext">Tu cerebro está sufriendo cambios estructurales reales. Esto es lo que la ciencia dice sobre tu situación:</p>
            
            <div className="science-list">
              <div className="science-item">
                <div className="sci-icon" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}><Brain size={20} /></div>
                <div className="sci-text">
                  <h3>Hipofrontalidad</h3>
                  <p>Reducción física del flujo sanguíneo a tu Córtex Prefrontal. Esta es la parte de tu cerebro encargada de la fuerza de voluntad y la toma de decisiones. Por eso sientes que "pierdes el control" y actúas en automático.</p>
                </div>
              </div>
              <div className="science-item">
                <div className="sci-icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}><Activity size={20} /></div>
                <div className="sci-text">
                  <h3>Desensibilización de Receptores D2</h3>
                  <p>La pornografía satura tu cerebro con tanta dopamina artificial que este se defiende eliminando receptores (D2). Como resultado, la vida real, el trabajo, el estudio y el gimnasio te parecen aburridos y carentes de sentido.</p>
                </div>
              </div>
              <div className="science-item">
                <div className="sci-icon" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}><ShieldAlert size={20} /></div>
                <div className="sci-text">
                  <h3>Acumulación de DeltaFosB</h3>
                  <p>Una proteína que se acumula en el sistema de recompensa tras picos extremos de placer artificial, grabando físicamente el surco de la adicción en tu cerebro y haciéndote propenso a otras adicciones.</p>
                </div>
              </div>
            </div>

            <button className="onboarding-btn-primary" onClick={nextStep} style={{ marginTop: '24px' }}>
              Ver la Solución <ArrowRight size={18} />
            </button>
          </div>
        );

      case 5:
        return (
          <div className="onboarding-content">
            <h1 className="onboarding-heading" style={{ fontSize: '28px', color: '#3b82f6' }}>Protocolo Aszend</h1>
            <p className="onboarding-subtext">La fuerza de voluntad no es suficiente. Necesitas un sistema estricto para forzar la neuroplasticidad inversa.</p>
            
            <div className="solution-box">
              <div className="sol-row">
                <Lock size={20} color="#3b82f6" />
                <span><strong>Bloqueador Nativo:</strong> Cero fricción. Tú decides qué bloquear, el sistema lo hace cumplir a nivel de Android.</span>
              </div>
              <div className="sol-row">
                <Activity size={20} color="#3b82f6" />
                <span><strong>Análisis de Riesgo:</strong> Algoritmo de prevención basado en tus check-ins diarios y factores de sueño/estrés.</span>
              </div>
              <div className="sol-row">
                <Zap size={20} color="#3b82f6" />
                <span><strong>Transmutación:</strong> Tracker estricto para redirigir tu dopamina hacia hábitos productivos reales.</span>
              </div>
            </div>

            <button className="onboarding-btn-primary" onClick={nextStep} style={{ marginTop: 'auto' }}>
              Comenzar Recuperación
            </button>
          </div>
        );

      case 6:
        return (
          <div className="onboarding-content">
            <div className="hero-icon-container" style={{ margin: '0 auto 20px auto' }}>
              <Unlock size={48} color="#8b5cf6" />
            </div>
            <h1 className="onboarding-heading" style={{ textAlign: 'center' }}>Comprométete contigo mismo</h1>
            <p className="onboarding-subtext" style={{ textAlign: 'center' }}>Selecciona tu plan para desbloquear el sistema de control absoluto.</p>
            
            <div className="pricing-grid">
              <div 
                className={`price-card-v2 ${selectedPlan === 'mensual' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('mensual')}
              >
                <div className="radio-circle">{selectedPlan === 'mensual' && <div className="radio-dot" />}</div>
                <div className="pc-content">
                  <h4>Mensual</h4>
                  <div className="pc-price">10€<span>/mes</span></div>
                  <p>Facturación mensual. Cancela cuando quieras.</p>
                </div>
              </div>

              <div 
                className={`price-card-v2 highlight ${selectedPlan === 'anual' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('anual')}
              >
                <div className="badge-best-value">MÁS POPULAR</div>
                <div className="radio-circle">{selectedPlan === 'anual' && <div className="radio-dot" />}</div>
                <div className="pc-content">
                  <h4>Anual</h4>
                  <div className="pc-price">20€<span>/año</span></div>
                  <p>Menos de 2€ al mes. Compromiso real a largo plazo.</p>
                </div>
              </div>
            </div>

            <button className="onboarding-btn-primary" onClick={() => navigate('/auth')} style={{ marginTop: 'auto', background: '#8b5cf6' }}>
              Comenzar Ahora
            </button>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="page-container" style={{ backgroundColor: '#050505', color: '#fff' }}>
      {/* Progress Bar (Only show on certain steps) */}
      {step > 0 && step < 3 && (
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${(step / 2) * 100}%` }}></div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ height: '100%', width: '100%' }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
