import { Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/PanicButton.css';

const PanicButton = () => {
  const { triggerPanicRoom } = useAppContext();

  return (
    <button className="panic-button" onClick={triggerPanicRoom}>
      <div className="panic-button-bg"></div>
      <span className="panic-button-content">
        <Zap size={18} strokeWidth={2.5} />
        Activar Protocolo de Control
      </span>
    </button>
  );
};

export default PanicButton;
