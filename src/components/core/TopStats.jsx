import { motion } from 'framer-motion';
import '../../styles/core/TopStats.css';

const TopStats = ({ relapses, target }) => {
  return (
    <div className="top-stats-container">
      <motion.div 
        className="stat-box ultra-glass"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="stat-box-label tracking-wide">META</span>
        <span className="stat-box-value">{target}</span>
      </motion.div>
    </div>
  );
};

export default TopStats;
