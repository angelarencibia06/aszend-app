import '../styles/StatsBlock.css';

const StatsBlock = ({ streak, relapses, target }) => {
  return (
    <div className="stats-block glass-panel">
      <div className="stat-item">
        <span className="stat-label">RECAÍDAS</span>
        <span className="stat-value">{relapses}</span>
      </div>
      
      <div className="stat-divider"></div>
      
      <div className="stat-item stat-highlight">
        <span className="stat-label">RACHA</span>
        <span className="stat-value text-gradient">{streak} <span className="text-small">días</span></span>
      </div>
      
      <div className="stat-divider"></div>
      
      <div className="stat-item">
        <span className="stat-label">META</span>
        <span className="stat-value">{target} <span className="text-small">días</span></span>
      </div>
    </div>
  );
};

export default StatsBlock;
