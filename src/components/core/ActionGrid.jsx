import { PenTool, Target, RefreshCw, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/core/ActionGrid.css';

const ActionGrid = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="action-grid"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.button className="action-btn ultra-glass" variants={item} whileTap={{ scale: 0.95 }}>
        <div className="action-icon-wrapper blue-glow">
          <PenTool size={20} className="action-icon" />
        </div>
        <span>Diario</span>
      </motion.button>
      
      <motion.button className="action-btn ultra-glass" variants={item} whileTap={{ scale: 0.95 }}>
        <div className="action-icon-wrapper blue-glow">
          <Target size={20} className="action-icon" />
        </div>
        <span>Hábitos</span>
      </motion.button>
      
      <motion.button className="action-btn ultra-glass" variants={item} whileTap={{ scale: 0.95 }}>
        <div className="action-icon-wrapper blue-glow">
          <Activity size={20} className="action-icon" />
        </div>
        <span>Meditar</span>
      </motion.button>
      
      <motion.button className="action-btn ultra-glass" variants={item} whileTap={{ scale: 0.95 }}>
        <div className="action-icon-wrapper red-glow">
          <RefreshCw size={20} className="action-icon" color="#ff4444" />
        </div>
        <span style={{ color: '#ff4444' }}>Reset</span>
      </motion.button>
    </motion.div>
  );
};

export default ActionGrid;
