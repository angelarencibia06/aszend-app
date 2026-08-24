import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useAppContext } from '../context/AppContext';
import '../styles/MilestoneOverlay.css';

const getMilestoneData = (days) => {
  if (days >= 365) return {
    title: 'ASCENSIÓN',
    message: '"Aquel que domina su deseo más primitivo, es dueño del universo entero."\n\nEstás completamente curado. Eres imparable.',
    color: '#eab308' // Gold
  };
  if (days >= 90) return {
    title: 'NIRVANA',
    message: '"El placer efímero te debilita, el control absoluto te hace inmortal."\n\nTu energía sexual ahora es fuego creador. No te detengas.',
    color: '#8b5cf6' // Purple
  };
  if (days >= 30) return {
    title: 'PURIFICACIÓN',
    message: '"La verdadera fuerza no está en reprimir, sino en transmutar esa energía."\n\nTu cerebro se está curando. Sigue así.',
    color: '#044eda' // Neon Blue
  };
  return {
    title: 'EL DESPERTAR',
    message: '"Quien cede a sus impulsos se convierte en esclavo de una pantalla."\n\nHas roto las primeras cadenas. Mantente firme.',
    color: '#ef4444' // Red
  };
};

const MilestoneOverlay = () => {
  const { activeMilestone, setActiveMilestone } = useAppContext();

  // Siempre retornamos AnimatePresence para que framer-motion gestione el exit
  return (
    <AnimatePresence>
      {activeMilestone !== null && (
        <motion.div 
          className="milestone-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Confetti 
            colors={['#044eda', '#ef4444', '#eab308', '#ffffff']} 
            opacity={0.6} 
            recycle={true}
            numberOfPieces={150}
          />
          
          <div className="milestone-content">
            <motion.h2 
              className="milestone-title"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              style={{ textShadow: `0 0 20px ${getMilestoneData(activeMilestone).color}` }}
            >
              {getMilestoneData(activeMilestone).title}
            </motion.h2>

            <motion.div 
              className="milestone-orb-container"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, delay: 0.3 }}
            >
              <div 
                className="milestone-orb" 
                style={{ 
                  boxShadow: `0 0 50px ${getMilestoneData(activeMilestone).color}, inset 0 0 30px ${getMilestoneData(activeMilestone).color}`,
                  borderColor: getMilestoneData(activeMilestone).color
                }}
              >
                <div 
                  className="orb-spin-ring"
                  style={{ borderColor: getMilestoneData(activeMilestone).color }}
                ></div>
                <span className="milestone-number" style={{ textShadow: `0 0 20px ${getMilestoneData(activeMilestone).color}` }}>
                  {activeMilestone}
                </span>
                <span className="milestone-label">DÍAS</span>
              </div>
            </motion.div>

            <motion.div 
              className="milestone-message"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8 }}
              style={{ whiteSpace: 'pre-line' }}
            >
              {getMilestoneData(activeMilestone).message}
            </motion.div>

            <motion.button 
              className="milestone-close-btn"
              onClick={() => setActiveMilestone(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              CONTINUAR
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MilestoneOverlay;
