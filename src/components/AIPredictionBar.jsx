import '../styles/AIPredictionBar.css';
import { BrainCircuit } from 'lucide-react';

const AIPredictionBar = ({ progress }) => {
  return (
    <div className="prediction-container glass-panel">
      <div className="prediction-header">
        <div className="prediction-title">
          <BrainCircuit size={16} className="ai-icon" />
          <span>Reconfiguración Cerebral (IA)</span>
        </div>
        <span className="prediction-value">{progress}%</span>
      </div>
      
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        >
          <div className="progress-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default AIPredictionBar;
