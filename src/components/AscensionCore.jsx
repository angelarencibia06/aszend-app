import '../styles/AscensionCore.css';

const AscensionCore = ({ rank }) => {
  // We'll use a placeholder structure for the rank image
  // In production, this will load the actual uploaded user images
  
  return (
    <div className="ascension-core-container">
      <div className="core-glow-bg"></div>
      
      <div className="rank-image-wrapper">
        {/* Placeholder for the user's images. 
            We use a CSS fallback if the image is missing */}
        <div className="css-rank-placeholder">
          <div className="ring ring-outer"></div>
          <div className="ring ring-middle"></div>
          <div className="ring ring-inner"></div>
          <div className="arrow-up"></div>
        </div>
      </div>
      
      <div className="rank-info">
        <h2 className="rank-title text-gradient">Neófito</h2>
        <p className="rank-subtitle">{rank} días de Ascensión</p>
      </div>
    </div>
  );
};

export default AscensionCore;
