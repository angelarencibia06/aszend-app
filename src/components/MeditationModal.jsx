import React, { useState, useEffect } from 'react';
import { X, Wind } from 'lucide-react';
import '../styles/Meditation.css';

const MeditationModal = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [phase, setPhase] = useState('PREPARACIÓN');

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setPhase('COMPLETADO');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    let cycleInterval;
    if (isActive && timeLeft > 0) {
      const runCycle = () => {
        setPhase('INHALA');
        setTimeout(() => {
          if(!isActive) return;
          setPhase('MANTÉN');
          setTimeout(() => {
            if(!isActive) return;
            setPhase('EXHALA');
            setTimeout(() => {
              if(!isActive) return;
              setPhase('MANTÉN');
            }, 4000);
          }, 4000);
        }, 4000);
      };
      
      runCycle();
      cycleInterval = setInterval(runCycle, 16000);
    }
    return () => clearInterval(cycleInterval);
  }, [isActive, timeLeft]);

  const toggleMeditation = (mins) => {
    setTimeLeft(mins * 60);
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 fade-in-modal"
      style={{ background: '#05050A', zIndex: 99999 }}
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        style={{ zIndex: 100000 }}
      >
        <X size={24} className="text-white/60" />
      </button>

      <div className="w-full max-w-md flex flex-col items-center text-center">
        {!isActive && phase !== 'COMPLETADO' ? (
          <div className="flex flex-col items-center gap-8 fade-in-up">
            <div className="p-5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4" style={{ boxShadow: '0 0 30px rgba(37,99,235,0.2)' }}>
              <Wind size={56} className="text-blue-400" />
            </div>
            
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2 uppercase tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                RESETEA TU MENTE
              </h2>
              <p className="text-gray-400 text-sm max-w-[280px] mx-auto leading-relaxed">
                Controlar tu respiración es el primer paso para dominar tus impulsos.
              </p>
            </div>

            <div className="flex gap-4 mt-8 w-full justify-center">
              <button 
                onClick={() => toggleMeditation(3)}
                className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex-1 max-w-[140px]"
                style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
              >
                3 MIN
              </button>
              <button 
                onClick={() => toggleMeditation(5)}
                className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 flex-1 max-w-[140px]"
              >
                5 MIN
              </button>
            </div>
          </div>
        ) : phase === 'COMPLETADO' ? (
          <div className="flex flex-col items-center pop-in">
            <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mb-6" style={{ boxShadow: '0 0 50px rgba(37,99,235,0.3)' }}>
              <Wind size={40} className="text-blue-400" />
            </div>
            <h2 className="text-4xl font-extrabold text-blue-400 mb-4 uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
              COMPLETADO
            </h2>
            <p className="text-gray-400 mb-12">Has recuperado el control.</p>
            <button 
              onClick={onClose}
              className="px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              CERRAR
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full relative fade-in-modal">
            <h3 className="text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-12">
              Box Breathing (4-4-4-4)
            </h3>
            
            <div className="relative flex items-center justify-center w-72 h-72 mb-12">
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-6 rounded-full border border-white/[0.03]" />
              
              <div className={`breath-circle ${isActive ? 'animating' : ''}`} />
              <div className={`breath-circle-inner ${isActive ? 'animating' : ''}`} />
              
              <div className="z-10 text-center flex items-center justify-center h-full w-full">
                <h2 
                  key={phase}
                  className="text-4xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg phase-text absolute"
                  style={{ fontFamily: "'Oswald', sans-serif", width: "100%", textAlign: "center" }}
                >
                  {phase}
                </h2>
              </div>
            </div>

            <div className="text-6xl font-extrabold text-white/90 tabular-nums tracking-tight mb-8" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {formatTime(timeLeft)}
            </div>
            
            <button 
              onClick={() => { setIsActive(false); setPhase('PREPARACIÓN'); }}
              className="mt-6 px-6 py-3 rounded-full text-xs font-bold text-gray-400 uppercase tracking-widest bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
            >
              Terminar antes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationModal;
