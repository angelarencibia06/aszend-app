import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Activity, MapPin, Lock, ChevronRight, X, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/PanicRoom2.css';

const PanicRoom = () => {
  const { setIsPanicRoomActive } = useAppContext();
  
  // Steps: 'phase1', 'assess1', 'phase2', 'assess2', 'phase3'
  const [step, setStep] = useState('phase1');
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  useEffect(() => {
    let interval;
    if ((step === 'phase2' || step === 'phase3') && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timerSeconds]);

  const closePanicRoom = () => {
    setIsPanicRoomActive(false);
  };

  const startPhase2 = () => {
    setStep('phase2');
    setTimerSeconds(300); // 5 minutes walking
  };

  const startPhase3 = () => {
    setStep('phase3');
    setTimerSeconds(600); // 10 minutes lockdown
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="panic-fullscreen"
    >
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: CHOQUE FÍSICO */}
        {step === 'phase1' && (
          <motion.div key="p1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: '-100%' }} className="panic-view">
            <div className="panic-level-header" style={{ marginTop: '20px' }}>
              <ShieldAlert size={48} color="#ef4444" className="pulse-alert" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ color: '#ef4444' }}>FASE 1: CHOQUE FÍSICO</h2>
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>Tira el móvil al suelo. Haz 20 flexiones INMEDIATAMENTE.</p>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>Necesitamos desviar el flujo sanguíneo de tu cerebro a tus músculos para matar el impulso.</p>
            </div>
            
            <div className="camera-mockup">
              <div className="scanner-line"></div>
              <div className="camera-overlay-text">IA DETECTANDO POSTURA...</div>
            </div>

            <div className="rep-counter">
              <span className="rep-number">0</span>
              <span className="rep-target">/ 20</span>
            </div>
            
            <button className="btn-finish-level" onClick={() => setStep('assess1')}>
              HE TERMINADO LAS FLEXIONES
            </button>
          </motion.div>
        )}

        {/* ASSESSMENT 1 */}
        {step === 'assess1' && (
          <motion.div key="a1" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ opacity: 0, x: '-100%' }} className="panic-view" style={{ justifyContent: 'center' }}>
            <Activity size={64} color="#3b82f6" style={{ margin: '0 auto 30px' }} />
            <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '15px' }}>EVALUACIÓN DE ESTADO</h2>
            <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '50px', fontSize: '16px', lineHeight: '1.5' }}>
              Has quemado la energía inicial de la ansiedad.<br/>Sé completamente honesto contigo mismo:<br/><br/>
              <strong style={{ color: '#fff' }}>¿Sigues sintiendo una fuerte tentación de recaer?</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <button 
                onClick={closePanicRoom}
                style={{ padding: '20px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', color: '#10b981', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <CheckCircle size={24} /> YA TENGO EL CONTROL. SALIR.
              </button>
              
              <button 
                onClick={startPhase2}
                style={{ padding: '20px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444', color: '#ef4444', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <AlertTriangle size={24} /> AÚN ESTOY MAL. NECESITO MÁS.
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: RESET AMBIENTAL */}
        {step === 'phase2' && (
          <motion.div key="p2" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ opacity: 0, x: '-100%' }} className="panic-view">
            <div className="panic-level-header" style={{ marginTop: '40px' }}>
              <MapPin size={56} color="#f59e0b" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ color: '#f59e0b' }}>FASE 2: RESET AMBIENTAL</h2>
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>El entorno en el que estás ahora mismo es el problema. SAL DE AHÍ.</p>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>Ve al salón, a la calle, o date una ducha fría. Camina hasta que el contador llegue a cero.</p>
            </div>
            
            <div className="countdown-timer" style={{ color: '#f59e0b', textShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}>
              {formatTime(timerSeconds)}
            </div>

            {/* Dev skip button */}
            {timerSeconds > 0 && (
              <button onClick={() => setTimerSeconds(0)} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', marginTop: '20px', cursor: 'pointer' }}>
                (Dev: Saltar tiempo)
              </button>
            )}

            {timerSeconds === 0 && (
              <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} className="btn-finish-level" style={{ background: '#f59e0b', color: '#000' }} onClick={() => setStep('assess2')}>
                HE CAMBIADO DE ENTORNO
              </motion.button>
            )}
          </motion.div>
        )}

        {/* ASSESSMENT 2 */}
        {step === 'assess2' && (
          <motion.div key="a2" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ opacity: 0, x: '-100%' }} className="panic-view" style={{ justifyContent: 'center' }}>
            <ShieldCheck size={64} color="#10b981" style={{ margin: '0 auto 30px' }} />
            <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '15px' }}>ÚLTIMA EVALUACIÓN</h2>
            <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '50px', fontSize: '16px', lineHeight: '1.5' }}>
              Has realizado un choque físico y un reset ambiental.<br/><br/>
              <strong style={{ color: '#fff' }}>¿Estás listo para volver a usar tu dispositivo de forma segura?</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <button 
                onClick={closePanicRoom}
                style={{ padding: '20px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', color: '#10b981', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <CheckCircle size={24} /> SÍ, ESTOY A SALVO. SALIR.
              </button>
              
              <button 
                onClick={startPhase3}
                style={{ padding: '20px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444', color: '#ef4444', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <Lock size={24} /> NO, ESTOY A PUNTO DE CAER.
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: BLOQUEO TOTAL */}
        {step === 'phase3' && (
          <motion.div key="p3" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ opacity: 0, x: '-100%' }} className="panic-view danger-view">
            <div className="panic-level-header" style={{ marginTop: '80px' }}>
              <Lock size={72} color="#ef4444" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ color: '#ef4444', fontSize: '32px' }}>BLOQUEO ACTIVO</h2>
              <p style={{ color: '#fca5a5', fontSize: '16px' }}>Es hora de protegerte de ti mismo. Tu dispositivo acaba de ser bloqueado.</p>
              <p style={{ color: '#9ca3af', marginTop: '10px' }}>No podrás acceder a ninguna aplicación hasta que termine el tiempo.</p>
            </div>
            
            <div className="countdown-timer" style={{ color: '#ef4444', textShadow: '0 0 30px rgba(239, 68, 68, 0.8)', fontSize: '100px' }}>
              {formatTime(timerSeconds)}
            </div>

            {/* Dev skip button */}
            {timerSeconds > 0 && (
              <button onClick={() => setTimerSeconds(0)} style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', marginTop: '20px', cursor: 'pointer', zIndex: 10 }}>
                (Dev: Forzar desbloqueo)
              </button>
            )}

            {timerSeconds === 0 && (
              <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} className="btn-finish-level" style={{ background: '#ef4444', color: '#fff', marginTop: '40px' }} onClick={closePanicRoom}>
                DESBLOQUEAR DISPOSITIVO
              </motion.button>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};

export default PanicRoom;
