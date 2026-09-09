import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Wind } from 'lucide-react';

const MeditationModal = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [phase, setPhase] = useState('PREPARACIÓN');
  const [duration, setDuration] = useState(180);

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
    setDuration(mins * 60);
    setTimeLeft(mins * 60);
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  let scale = 1;
  if (phase === 'INHALA') scale = 1.6;
  else if (phase === 'EXHALA') scale = 0.8;
  else if (phase === 'MANTÉN') {
    scale = timeLeft % 16 > 8 ? 1.6 : 0.8; 
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5, 5, 10, 0.95)', backdropFilter: 'blur(20px)' }}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
      >
        <X size={24} className="text-white/60" />
      </button>

      <div className="w-full max-w-md flex flex-col items-center text-center">
        {!isActive && phase !== 'COMPLETADO' ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="p-5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4" style={{ boxShadow: '0 0 30px rgba(37,99,235,0.2)' }}>
              <Wind size={56} className="text-blue-400" />
            </div>
            
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2 uppercase tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                RESETEA TU MENTE
              </h2>
              <p className="text-gray-400 text-sm max-w-[280px] mx-auto">
                Controlar tu respiración es el primer paso para dominar tus impulsos. Elige tu tiempo.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => toggleMeditation(3)}
                className="px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#fff', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
              >
                3 MIN

              </button>
              <button 
                onClick={() => toggleMeditation(5)}
                className="px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all border border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                5 MIN
              </button>
            </div>
          </motion.div>
        ) : phase === 'COMPLETADO' ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-4xl font-extrabold text-blue-400 mb-4 uppercase" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '0 0 20px rgba(37,99,235,0.4)' }}>
              SESIÓN COMPLETADA
            </h2>
            <p className="text-gray-400 mb-8">Has recuperado el control. Vuelve al centro de mando.</p>
            <button 
              onClick={onClose}
              className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              VOLVER
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center w-full relative">
            <h3 className="text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-16">
              Box Breathing (4-4-4-4)
            </h3>
            
            <div className="relative flex items-center justify-center w-64 h-64 mb-16">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-4 rounded-full border border-white/5" />
              
              <motion.div
                animate={{ scale: scale }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="absolute w-40 h-40 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(29,78,216,0) 70%)',
                  boxShadow: '0 0 60px rgba(37,99,235,0.4)'
                }}
              />
              <motion.div
                animate={{ scale: scale }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="absolute w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(37,99,235,0.8) 0%, rgba(29,78,216,0) 70%)',
                  boxShadow: '0 0 40px rgba(37,99,235,0.6)'
                }}
              />
              
              <div className="z-10 text-center">
                <motion.h2 
                  key={phase}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl font-extrabold text-white tracking-widest uppercase drop-shadow-lg"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {phase}
                </motion.h2>
              </div>
            </div>

            <div className="text-6xl font-extrabold text-white/90 tabular-nums tracking-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
              {formatTime(timeLeft)}
            </div>
            
            <button 
              onClick={() => { setIsActive(false); setPhase('PREPARACIÓN'); }}
              className="mt-16 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              Terminar antes
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MeditationModal;
