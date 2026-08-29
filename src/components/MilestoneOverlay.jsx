import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useAppContext } from '../context/AppContext';
import '../styles/MilestoneOverlay.css';
import '../styles/Home2.css';

const RANKS = [
  { id: 1, name: 'VACÍO', number: '01', color1: '#64748b', color2: '#334155', shadow: 'rgba(100, 116, 139, 0.5)', req: 0 },
  { id: 2, name: 'PULSO', number: '02', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 7 },
  { id: 3, name: 'AURA', number: '03', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 30 },
  { id: 4, name: 'NÚCLEO', number: '04', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 90 },
  { id: 5, name: 'ÉTER', number: '05', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 180 },
  { id: 6, name: 'ASCENSIÓN', number: '06', color1: '#fcd34d', color2: '#d97706', shadow: 'rgba(252, 211, 77, 0.5)', req: 365 },
];

const getMilestoneData = (days) => {
  let rank = RANKS[0];
  for (let i = 0; i < RANKS.length; i++) {
    if (days >= RANKS[i].req) rank = RANKS[i];
  }
  
  if (rank.id === 5) return {
    title: rank.name,
    message: '"Aquel que domina su deseo más primitivo, es dueño del universo entero."\n\nHas alcanzado la cima.',
    color1: rank.color1, color2: rank.color2, shadow: rank.shadow
  };
  if (rank.id === 4) return {
    title: rank.name,
    message: '"El placer efímero te debilita, el control absoluto te hace inmortal."\n\nEres imparable.',
    color1: rank.color1, color2: rank.color2, shadow: rank.shadow
  };
  if (rank.id === 3) return {
    title: rank.name,
    message: '"La verdadera fuerza no está en reprimir, sino en transmutar."\n\nTu cerebro está purificado.',
    color1: rank.color1, color2: rank.color2, shadow: rank.shadow
  };
  if (rank.id === 2) return {
    title: rank.name,
    message: '"Quien cede a sus impulsos se convierte en esclavo."\n\nHas roto las cadenas. Mantente firme.',
    color1: rank.color1, color2: rank.color2, shadow: rank.shadow
  };
  
  return {
    title: rank.name,
    message: 'El camino hacia la grandeza acaba de empezar.',
    color1: rank.color1, color2: rank.color2, shadow: rank.shadow
  };
};

const MilestoneOverlay = () => {
  const { activeMilestone, setActiveMilestone } = useAppContext();

  const data = activeMilestone !== null ? getMilestoneData(activeMilestone) : null;

  return (
    <AnimatePresence>
      {activeMilestone !== null && (
        <motion.div 
          className="milestone-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}
        >
          <Confetti 
            colors={[data.color1, data.color2, '#ffffff']} 
            opacity={0.6} 
            recycle={true}
            numberOfPieces={200}
          />
          
          <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.h3
               initial={{ y: -20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
               style={{ color: 'var(--text-muted)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '14px', marginBottom: '10px' }}
            >
              NUEVO RANGO DESBLOQUEADO
            </motion.h3>
            <motion.h2 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontSize: '48px', fontFamily: 'Oswald', margin: '0 0 40px 0', textShadow: `0 0 30px ${data.color1}`, color: '#fff', textTransform: 'uppercase' }}
            >
              {data.title}
            </motion.h2>

            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.3 }}
              style={{ width: '180px', height: '180px', marginBottom: '40px' }}
            >
              <div className="sphere-wrapper" style={{ width: '100%', height: '100%' }}>
                <div className="sphere animated-sphere" style={{ background: `radial-gradient(circle at 35% 35%, ${data.color1}, ${data.color2})`, boxShadow: `0 0 50px ${data.shadow}, inset -10px -10px 20px rgba(0,0,0,0.5)` }}>
                  <div className="orbital-ring spinning-ring"></div>
                  <div className="highlight"></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{ whiteSpace: 'pre-line', fontSize: '16px', color: '#e5e7eb', maxWidth: '300px', lineHeight: '1.6' }}
            >
              {data.message}
            </motion.div>

            <motion.button 
              onClick={() => setActiveMilestone(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              style={{ marginTop: '50px', background: data.color2, color: '#fff', border: 'none', padding: '16px 40px', borderRadius: '30px', fontWeight: 'bold', fontSize: '16px', letterSpacing: '2px', cursor: 'pointer', boxShadow: `0 0 20px ${data.shadow}` }}
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
