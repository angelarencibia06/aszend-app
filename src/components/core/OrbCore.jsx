import { motion } from 'framer-motion';
import { getStreakData } from '../../context/AppContext';
import '../../styles/core/OrbCore.css';

const OrbCore = ({ rank, streak, target = 30 }) => {
  const progress = Math.min((streak / target) * 100, 100);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const streakData = getStreakData(streak);
  const orbColor = streakData.color;

  return (
    <div className="orb-container" style={{ '--orb-color': orbColor, '--accent-neon': orbColor }}>
      {/* Ambient Glows */}
      <div className="orb-ambient-glow pulse-slow" style={{ background: `radial-gradient(circle, ${orbColor}20 0%, transparent 70%)` }}></div>
      
      {/* Circular Progress SVG */}
      <svg className="orb-svg" width="280" height="280" viewBox="0 0 280 280">
        <circle 
          cx="140" cy="140" r={radius} 
          className="orb-track" 
        />
        <motion.circle 
          cx="140" cy="140" r={radius} 
          className="orb-progress"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ stroke: orbColor }}
        />
        {/* Glow effect for progress */}
        <motion.circle 
          cx="140" cy="140" r={radius} 
          className="orb-progress-glow"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ stroke: orbColor, filter: `drop-shadow(0 0 10px ${orbColor})` }}
        />
      </svg>

      {/* Center Core Data */}
      <motion.div 
        className="orb-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="orb-rank tracking-wide text-dim">{streakData.title}</span>
        <h2 className="orb-streak tracking-tight" style={{ color: orbColor, textShadow: `0 0 15px ${orbColor}80` }}>{streak}</h2>
        <span className="orb-label">DÍAS LIBRE</span>
      </motion.div>
    </div>
  );
};

export default OrbCore;
