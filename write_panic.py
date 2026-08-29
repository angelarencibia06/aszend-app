panic_room_code = """import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Activity, MapPin, Phone, Lock, ChevronLeft, ShieldCheck, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/PanicRoom2.css';

const PanicRoom = () => {
  const { setIsPanicRoomActive } = useAppContext();
  const [activeLevel, setActiveLevel] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  // Timer logic
  useEffect(() => {
    let interval;
    if (activeLevel === 2 || activeLevel === 4) {
      if (timerSeconds > 0) {
        interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
      } else if (timerSeconds === 0 && activeLevel === 4) {
        // Unlock automatically after Nivel 4 time
        setIsPanicRoomActive(false);
      }
    }
    return () => clearInterval(interval);
  }, [activeLevel, timerSeconds]);

  const closePanicRoom = () => {
    setIsPanicRoomActive(false);
  };

  const startLevel2 = () => {
    setActiveLevel(2);
    setTimerSeconds(600); // 10 minutes
  };

  const startLevel4 = () => {
    setActiveLevel(4);
    setTimerSeconds(300); // 5 minutes lockdown
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
        
        {/* MAIN MENU */}
        {activeLevel === null && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="panic-menu">
            <div className="panic-header-alert">
              <ShieldAlert size={40} color="#ef4444" className="pulse-alert" />
              <h1>PROTOCOLO DE EMERGENCIA</h1>
              <p>Tu cerebro está siendo secuestrado por dopamina artificial. Toma acción inmediata.</p>
            </div>

            <div className="panic-options">
              <button className="panic-card" onClick={() => setActiveLevel(1)}>
                <div className="panic-card-icon"><Activity size={24} color="#f97316" /></div>
                <div className="panic-card-info">
                  <h3>CHOQUE FÍSICO</h3>
                  <p>20 Flexiones monitoreadas por IA para quemar la ansiedad al instante.</p>
                </div>
                <ChevronRightIcon />
              </button>

              <button className="panic-card" onClick={startLevel2}>
                <div className="panic-card-icon"><MapPin size={24} color="#3b82f6" /></div>
                <div className="panic-card-info">
                  <h3>RESET AMBIENTAL</h3>
                  <p>Obligado a salir de tu entorno actual durante 10 minutos.</p>
                </div>
                <ChevronRightIcon />
              </button>

              <button className="panic-card" onClick={() => setActiveLevel(3)}>
                <div className="panic-card-icon"><Phone size={24} color="#10b981" /></div>
                <div className="panic-card-info">
                  <h3>APOYO SOCIAL</h3>
                  <p>Abre el teléfono para llamar a tu contacto de emergencia/responsabilidad.</p>
                </div>
                <ChevronRightIcon />
              </button>

              <button className="panic-card danger-card" onClick={startLevel4}>
                <div className="panic-card-icon"><Lock size={24} color="#ef4444" /></div>
                <div className="panic-card-info">
                  <h3 style={{ color: '#ef4444' }}>BLOQUEO TOTAL (ANDROID)</h3>
                  <p style={{ color: 'rgba(239, 68, 68, 0.7)' }}>Bloqueo de apps del sistema por 5 min. Irreversible.</p>
                </div>
                <ChevronRightIcon />
              </button>
            </div>

            <button className="panic-cancel-btn" onClick={closePanicRoom}>
              <X size={20} />
              <span>FALSA ALARMA (SALIR)</span>
            </button>
          </motion.div>
        )}

        {/* LEVEL 1: CHOQUE FISICO (MOCK UI) */}
        {activeLevel === 1 && (
          <motion.div key="l1" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="panic-view">
            <button className="panic-back" onClick={() => setActiveLevel(null)}><ChevronLeft size={24} /> Volver</button>
            <div className="panic-level-header">
              <Activity size={32} color="#f97316" />
              <h2>CHOQUE FÍSICO</h2>
              <p>Coloca el móvil en el suelo. Haz flexiones. La cámara validará tu movimiento en local.</p>
            </div>
            
            <div className="camera-mockup">
              <div className="scanner-line"></div>
              <div className="camera-overlay-text">INICIANDO RECONOCIMIENTO IA...</div>
            </div>

            <div className="rep-counter">
              <span className="rep-number">0</span>
              <span className="rep-target">/ 20</span>
            </div>
            
            <button className="btn-finish-level" onClick={closePanicRoom}>COMPLETADO MANUALMENTE</button>
          </motion.div>
        )}

        {/* LEVEL 2: RESET AMBIENTAL */}
        {activeLevel === 2 && (
          <motion.div key="l2" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="panic-view">
            {timerSeconds > 0 && <button className="panic-back" onClick={() => setActiveLevel(null)}><ChevronLeft size={24} /> Abortar</button>}
            
            <div className="panic-level-header" style={{ marginTop: '40px' }}>
              <MapPin size={48} color="#3b82f6" style={{ margin: '0 auto 20px' }} />
              <h2>RESET AMBIENTAL</h2>
              <p>Sal de donde estás. El entorno actual es un gatillo. Camina hasta que el temporizador termine.</p>
            </div>
            
            <div className="countdown-timer" style={{ color: '#3b82f6', textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}>
              {formatTime(timerSeconds)}
            </div>

            {timerSeconds === 0 && (
              <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} className="btn-finish-level" style={{ background: '#3b82f6', color: '#fff' }} onClick={closePanicRoom}>
                HE VUELTO AL CONTROL
              </motion.button>
            )}
          </motion.div>
        )}

        {/* LEVEL 3: APOYO SOCIAL */}
        {activeLevel === 3 && (
          <motion.div key="l3" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="panic-view">
            <button className="panic-back" onClick={() => setActiveLevel(null)}><ChevronLeft size={24} /> Volver</button>
            
            <div className="panic-level-header" style={{ marginTop: '40px' }}>
              <Phone size={48} color="#10b981" style={{ margin: '0 auto 20px' }} />
              <h2>APOYO SOCIAL</h2>
              <p>Verbalizar el problema destruye el impulso. Llama ahora a tu contacto de confianza.</p>
            </div>
            
            <a href="tel:" className="btn-finish-level" style={{ textDecoration: 'none', background: '#10b981', color: '#000', display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '60px' }} onClick={closePanicRoom}>
              <Phone size={20} /> ABRIR TELÉFONO
            </a>
          </motion.div>
        )}

        {/* LEVEL 4: BLOQUEO TOTAL */}
        {activeLevel === 4 && (
          <motion.div key="l4" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="panic-view danger-view">
            <div className="panic-level-header" style={{ marginTop: '80px' }}>
              <Lock size={64} color="#ef4444" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ color: '#ef4444' }}>BLOQUEO ACTIVO</h2>
              <p style={{ color: '#fca5a5' }}>El dispositivo (simulado) está bloqueado por Overlay nativo. No puedes salir de esta pantalla.</p>
            </div>
            
            <div className="countdown-timer" style={{ color: '#ef4444', textShadow: '0 0 30px rgba(239, 68, 68, 0.8)' }}>
              {formatTime(timerSeconds)}
            </div>

            <div className="security-notice">
              <ShieldCheck size={16} /> MODO HARDCORE (ANDROID USAGE STATS API)
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default PanicRoom;
"""

css_code = """/* PREMIUM PANIC ROOM CSS */
.panic-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #050505;
  z-index: 10000;
  color: #fff;
  overflow: hidden;
}

.panic-menu {
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.panic-header-alert {
  text-align: center;
  margin-bottom: 40px;
}

.panic-header-alert h1 {
  font-family: 'Oswald', sans-serif;
  font-size: 28px;
  letter-spacing: 2px;
  margin: 15px 0 10px;
  color: #ef4444;
}

.panic-header-alert p {
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.5;
  margin: 0;
}

.pulse-alert {
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.2)); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 25px rgba(239, 68, 68, 0.8)); }
  100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.2)); }
}

.panic-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.panic-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.panic-card:active {
  transform: scale(0.97);
  background: rgba(255, 255, 255, 0.08);
}

.panic-card-icon {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.panic-card-info {
  flex: 1;
}

.panic-card-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.panic-card-info p {
  margin: 0;
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.4;
}

.danger-card {
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.05);
}
.danger-card .panic-card-icon {
  background: rgba(239, 68, 68, 0.1);
}

.panic-cancel-btn {
  margin-top: auto;
  width: 100%;
  padding: 16px;
  background: transparent;
  border: 2px solid #374151;
  color: #9ca3af;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

/* PANIC VIEWS */
.panic-view {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.danger-view {
  background: radial-gradient(circle at center, rgba(239, 68, 68, 0.15) 0%, #050505 70%);
}

.panic-back {
  background: none;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 0;
  cursor: pointer;
  margin-bottom: 20px;
}

.panic-level-header {
  text-align: center;
  margin-bottom: 30px;
}
.panic-level-header h2 {
  font-family: 'Oswald', sans-serif;
  font-size: 24px;
  letter-spacing: 1px;
  margin: 15px 0 10px;
}
.panic-level-header p {
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.5;
}

.camera-mockup {
  flex: 1;
  background: #111;
  border-radius: 20px;
  border: 2px dashed #333;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #f97316;
  box-shadow: 0 0 10px #f97316;
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.camera-overlay-text {
  font-family: monospace;
  color: #f97316;
  font-weight: bold;
  letter-spacing: 2px;
}

.rep-counter {
  text-align: center;
  margin-bottom: 30px;
}

.rep-number {
  font-size: 60px;
  font-weight: 900;
  color: #fff;
}
.rep-target {
  font-size: 24px;
  color: #666;
  font-weight: bold;
}

.btn-finish-level {
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  background: #fff;
  color: #000;
  border: none;
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: 40px;
}

.countdown-timer {
  font-size: 80px;
  font-weight: 900;
  font-family: 'Oswald', sans-serif;
  text-align: center;
  margin: 40px 0;
  letter-spacing: 2px;
}

.security-notice {
  margin-top: auto;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #ef4444;
  font-family: monospace;
  font-size: 12px;
}
"""

with open("src/components/PanicRoom.jsx", "w", encoding="utf-8") as f:
    f.write(panic_room_code)

with open("src/styles/PanicRoom2.css", "w", encoding="utf-8") as f:
    f.write(css_code)
