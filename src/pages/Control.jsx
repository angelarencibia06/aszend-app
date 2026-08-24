import React, { useState } from 'react';
import { Shield, Globe, Trash2, Plus } from 'lucide-react';
import '../styles/App.css';

const Control = () => {
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [sites, setSites] = useState([
    'sitio-1.com', 'sitio-2.com', 'sitio-3.com', 'sitio-4.com', 'sitio-5.com'
  ]);

  const removeSite = (siteToRemove) => {
    setSites(sites.filter(s => s !== siteToRemove));
  };

  return (
    <div className="page-container" style={{ padding: '20px', paddingBottom: '160px', color: '#fff', height: '100%', overflowY: 'auto' }}>
      
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 5px 0', fontFamily: 'Oswald' }}>Control</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>Tu entorno protegido.</p>
      </div>

      <div className="glass-panel" style={{ padding: '20px', borderRadius: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} color="var(--accent-neon)" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '16px' }}>Protección</p>
              <p style={{ margin: 0, fontSize: '12px', color: isProtectionActive ? '#10b981' : 'var(--text-muted)', fontWeight: 'bold' }}>
                {isProtectionActive ? 'ACTIVA' : 'INACTIVA'}
              </p>
            </div>
          </div>

          {/* Custom Toggle Switch */}
          <div 
            onClick={() => setIsProtectionActive(!isProtectionActive)}
            style={{
              width: '50px', height: '28px', borderRadius: '14px',
              background: isProtectionActive ? 'var(--accent-neon)' : 'rgba(255,255,255,0.2)',
              position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
            }}
          >
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%', background: '#fff',
              position: 'absolute', top: '2px', left: isProtectionActive ? '24px' : '2px',
              transition: 'left 0.3s', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
          Tu entorno está preparado. {sites.length} sitios bloqueados.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button style={{ 
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
            color: '#fff', padding: '10px 20px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' 
          }}>
            Gestionar sitios
          </button>
          <button style={{ 
            background: 'none', border: 'none', color: 'var(--accent-neon)', 
            fontWeight: '600', fontSize: '14px', cursor: 'pointer' 
          }}>
            Ver bloqueo
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '15px' }}>
        <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', margin: 0 }}>SITIOS BLOQUEADOS</h3>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sites.length} sitios</span>
      </div>

      <div className="glass-panel" style={{ padding: '10px', borderRadius: '20px' }}>
        {sites.map((site, index) => (
          <div key={index} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            padding: '15px', borderBottom: index < sites.length -1 ? '1px solid rgba(255,255,255,0.05)' : 'none' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe size={16} color="var(--accent-neon)" />
              <span style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>{site}</span>
            </div>
            <button 
              onClick={() => removeSite(site)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button style={{ 
        background: 'none', border: 'none', color: 'var(--accent-neon)', 
        fontWeight: '500', fontSize: '14px', marginTop: '20px', cursor: 'pointer' 
      }}>
        Ver todos ({sites.length}) &rarr;
      </button>

    </div>
  );
};

export default Control;
