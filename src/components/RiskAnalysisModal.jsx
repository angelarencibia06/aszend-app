import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RiskAnalysisModal = ({ onClose }) => {
  const { dailyRisk, riskFactors } = useAppContext();

  const getRiskColor = (risk) => {
    if (risk === null) return '#10b981';
    if (risk < 30) return '#10b981';
    if (risk < 70) return '#f59e0b';
    return '#ef4444';
  };

  const riskColor = getRiskColor(dailyRisk);
  const riskValue = dailyRisk !== null ? dailyRisk : 0;

  return (
    <div className="checkin-overlay">
      <motion.div 
        className="checkin-full-modal"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="checkin-header">
          <button className="back-btn" onClick={onClose}><ChevronLeft size={24} /></button>
          <h2 className="checkin-title">Analisis de riesgo</h2>
          <div style={{ width: 24 }}></div>
        </div>

        <div className="checkin-scroll-content">
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px' }}>
            <div className="risk-circle-container" style={{ width: 120, height: 120, marginBottom: '20px' }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                <circle 
                  cx="60" cy="60" r="50" fill="none" stroke={riskColor} strokeWidth="10"
                  strokeDasharray={`${314.15 * (riskValue / 100)} 314.15`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <p className="risk-value" style={{ fontSize: '28px' }}>{riskValue}%</p>
                <p className="risk-status" style={{ color: riskColor, fontSize: '12px' }}>
                  {riskValue < 30 ? 'BAJO' : riskValue < 70 ? 'MEDIO' : 'ALTO'}
                </p>
              </div>
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Riesgo estimado actual</h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Esta es una estimacion basada en tus patrones de hoy. No es un diagnostico.
            </p>
          </div>

          <h3 className="card-title" style={{ marginTop: '30px' }}>FACTORES DE HOY</h3>
          <div className="glass-card" style={{ padding: '15px' }}>
            {riskFactors && riskFactors.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {riskFactors.map((factor, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {factor.positive ? (
                      <CheckCircle2 size={18} color="#10b981" />
                    ) : (
                      <AlertCircle size={18} color="#ef4444" />
                    )}
                    <span style={{ fontSize: '14px', color: '#fff' }}>{factor.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>No hay datos. Haz el Check-in diario.</p>
            )}
          </div>

          <h3 className="card-title" style={{ marginTop: '30px' }}>QUE SIGNIFICA ESTO</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {riskValue < 30 
              ? "Tus habitos de hoy estan contribuyendo positivamente. Cada decision cuenta. Sigue en este camino." 
              : riskValue < 70 
              ? "Cuidado. Tienes algunos factores de riesgo activos. Considera activar el Protocolo de Control si sientes urgencia."
              : "PELIGRO. Tu nivel de riesgo es critico. Te recomendamos aislarte de tus dispositivos o realizar el Protocolo de Control inmediatamente."}
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default RiskAnalysisModal;
