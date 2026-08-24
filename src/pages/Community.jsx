import { Shield } from 'lucide-react';
import '../styles/Community.css';

const Community = () => {
  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
      
      <div className="discord-hub-container">
        <h2 className="page-title text-gradient" style={{ marginBottom: '10px' }}>COMUNIDAD PRIVADA</h2>
        
        <div className="quote-container glass-panel">
          <p className="stoic-quote">"El aislamiento fomenta la recaída. Un entorno enfocado garantiza la disciplina."</p>
        </div>

        <div className="discord-button-wrapper">
          <button className="discord-btn" onClick={() => window.open('https://discord.gg/65qzcjn3DU', '_blank')}>
            <svg viewBox="0 0 127.14 96.36" width="36" height="36" fill="currentColor" className="discord-icon">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.55,67.55,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.15ZM42.68,65.22c-5.25,0-9.57-4.82-9.57-10.74s4.23-10.75,9.57-10.75,9.63,4.84,9.57,10.75C52.25,60.4,48,65.22,42.68,65.22Zm41.71,0c-5.25,0-9.57-4.82-9.57-10.74s4.23-10.75,9.57-10.75,9.63,4.84,9.57,10.75C94,60.4,89.71,65.22,84.39,65.22Z"/>
            </svg>
            <span>ACCESO A DISCORD</span>
          </button>
        </div>

        <div className="quote-container glass-panel" style={{ marginTop: '30px' }}>
          <Shield size={24} color="#5865F2" style={{ marginBottom: '10px' }} />
          <p className="stoic-quote" style={{ fontSize: '14px', color: '#888', fontStyle: 'normal' }}>
            Accede al servidor exclusivo de Aszend. Comparte estrategias, documenta tu progreso y mantén el enfoque junto a otros miembros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;
