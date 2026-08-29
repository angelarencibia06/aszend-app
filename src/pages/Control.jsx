import React, { useState, useEffect, useRef } from 'react';
import { Shield, Globe, Trash2, Plus, X, Lock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import '../styles/Control.css';

// Local storage hook for the blocked sites
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

const Control = () => {
  const [isProtectionActive, setIsProtectionActive] = useLocalStorage('aszend_protection', true);
  const [sites, setSites] = useLocalStorage('aszend_blocked_sites', [
    'instagram.com', 'tiktok.com', 'twitter.com'
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSite, setNewSite] = useState('');
  
  // Panic Button State
  const [panicHoldProgress, setPanicHoldProgress] = useState(0);
  const holdIntervalRef = useRef(null);
  const [showPanicModal, setShowPanicModal] = useState(false);

  const removeSite = (siteToRemove) => {
    setSites(sites.filter(s => s !== siteToRemove));
  };

  const addSite = (e) => {
    e.preventDefault();
    if (newSite.trim() && !sites.includes(newSite.trim().toLowerCase())) {
      setSites([newSite.trim().toLowerCase(), ...sites]);
      setNewSite('');
      setShowAddModal(false);
    }
  };

  // Panic Button Logic
  const startPanicHold = () => {
    let progress = 0;
    holdIntervalRef.current = setInterval(() => {
      progress += 2;
      setPanicHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(holdIntervalRef.current);
        setShowPanicModal(true);
      }
    }, 20); // 100% in 1 second
  };

  const stopPanicHold = () => {
    clearInterval(holdIntervalRef.current);
    if (panicHoldProgress < 100) {
      setPanicHoldProgress(0);
    }
  };

  useEffect(() => {
    return () => clearInterval(holdIntervalRef.current);
  }, []);

  return (
    <div className="page-container control-page">
      
      {/* Header */}
      <div className="control-header">
        <h1>CONTROL</h1>
        <p>Tu entorno protegido (Android System)</p>
      </div>

      {/* Main Protection Card */}
      <div className={`protection-card ${isProtectionActive ? 'active' : 'inactive'}`}>
        <div className="protection-card-top">
          <div className="prot-left">
            <div className={`prot-icon ${isProtectionActive ? 'pulsing' : ''}`}>
              <Shield size={24} color={isProtectionActive ? '#3b82f6' : '#6b7280'} />
            </div>
            <div className="prot-info">
              <h3>Protección</h3>
              <span className={`prot-status ${isProtectionActive ? 'active' : ''}`}>
                {isProtectionActive ? 'ACTIVA' : 'INACTIVA'}
              </span>
            </div>
          </div>
          
          {/* Android-style native switch */}
          <div 
            className={`android-switch ${isProtectionActive ? 'on' : 'off'}`}
            onClick={() => setIsProtectionActive(!isProtectionActive)}
          >
            <div className="switch-thumb" />
            {/* Ripple effect wrapper can go here */}
          </div>
        </div>

        <p className="prot-desc">
          {isProtectionActive 
            ? `Tu entorno está preparado. Android Accesibility bloqueando ${sites.length} sitios.`
            : 'La protección está deshabilitada. Eres vulnerable a recaídas.'}
        </p>

        {!isProtectionActive && (
          <button className="android-permission-btn" onClick={() => setIsProtectionActive(true)}>
            <AlertTriangle size={16} /> ACTIVAR PERMISOS DE ACCESIBILIDAD
          </button>
        )}
      </div>

      {/* Sites Header */}
      <div className="sites-header">
        <h3>SITIOS BLOQUEADOS</h3>
        <button className="add-site-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Añadir
        </button>
      </div>

      {/* Dynamic Sites List */}
      <div className="sites-list">
        <AnimatePresence>
          {sites.map((site) => (
            <motion.div 
              key={site} 
              layout
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.9, marginLeft: -100 }}
              transition={{ duration: 0.25 }}
              className="site-item"
            >
              <div className="site-left">
                <div className="globe-icon"><Globe size={18} /></div>
                <span>{site}</span>
              </div>
              <button className="delete-btn" onClick={() => removeSite(site)}>
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
          {sites.length === 0 && (
            <div className="empty-sites">No tienes sitios bloqueados. Añade uno para protegerte.</div>
          )}
        </AnimatePresence>
      </div>

      {/* Panic Button */}
      <div className="panic-container">
        <div 
          className="panic-button"
          onMouseDown={startPanicHold}
          onMouseUp={stopPanicHold}
          onMouseLeave={stopPanicHold}
          onTouchStart={startPanicHold}
          onTouchEnd={stopPanicHold}
        >
          <div className="panic-progress" style={{ width: `${panicHoldProgress}%` }} />
          <span className="panic-text">
            {panicHoldProgress > 0 ? 'MANTÉN PULSADO...' : 'PROTOCOLO DE PÁNICO'}
          </span>
        </div>
        <p className="panic-hint">En caso de emergencia, mantén pulsado para bloqueo estricto.</p>
      </div>

      {/* Add Site Modal (Bottom Sheet style) */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            className="bottom-sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div 
              className="bottom-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="sheet-header">
                <h3>Añadir bloqueo</h3>
                <button className="close-sheet" onClick={() => setShowAddModal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={addSite} className="sheet-body">
                <p>Introduce el dominio que deseas bloquear en todo el dispositivo.</p>
                <div className="input-group">
                  <span className="input-prefix">https://</span>
                  <input 
                    type="text" 
                    placeholder="instagram.com" 
                    value={newSite}
                    onChange={(e) => setNewSite(e.target.value)}
                    autoFocus
                  />
                </div>
                <button type="submit" className="sheet-submit-btn" disabled={!newSite.trim()}>
                  <Lock size={18} /> BLOQUEAR SITIO
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panic Modal */}
      <AnimatePresence>
        {showPanicModal && (
          <motion.div 
            className="panic-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="panic-modal-content">
              <AlertTriangle size={64} color="#ef4444" style={{ marginBottom: 20 }} />
              <h2 style={{ color: '#ef4444', marginBottom: 10, fontSize: 28, textTransform: 'uppercase', letterSpacing: 2 }}>Bloqueo Activado</h2>
              <p style={{ color: '#fca5a5', fontSize: 16, textAlign: 'center', marginBottom: 30, lineHeight: 1.5 }}>
                Tu dispositivo ha entrado en modo restrictivo de alta seguridad. Suelta el móvil y aléjate.
              </p>
              <button 
                className="panic-disable-btn"
                onClick={() => { setShowPanicModal(false); setPanicHoldProgress(0); }}
              >
                DESACTIVAR EMERGENCIA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default Control;
