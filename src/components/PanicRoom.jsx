import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { ShieldCheck, Target, Activity, Phone, Lock, ChevronLeft, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/PanicRoom.css';

const PanicRoom = () => {
  const { closePanicRoom, panicPushupsTarget, setPanicPushupsTarget } = useAppContext();
  const [activeLevel, setActiveLevel] = useState(null); // null = menu, 1, 2, 3, 4
  const [showSettings, setShowSettings] = useState(false);

  // --- LEVEL 1 STATE ---
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [pushupCount, setPushupCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const stateRef = useRef({ count: 0, pushupState: 'up' });

  // --- LEVEL 2 & 4 STATE ---
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Level 1 logic
  useEffect(() => {
    if (activeLevel !== 1) return;
    const loadModel = async () => {
      if (!window.tf || !window.poseDetection) return;
      await window.tf.ready();
      const detectorConfig = { modelType: window.poseDetection.movenet.modelType.SINGLEPOSE_THUNDER };
      const detector = await window.poseDetection.createDetector(window.poseDetection.SupportedModels.MoveNet, detectorConfig);
      setModel(detector);
    };
    loadModel();
  }, [activeLevel]);

  useEffect(() => {
    if (activeLevel !== 1 || !model) return;
    let requestAnimationId;

    const detectPose = async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        video.width = vw; video.height = vh;
        if(canvasRef.current) {
          canvasRef.current.width = vw;
          canvasRef.current.height = vh;
        }

        const poses = await model.estimatePoses(video);
        if (activeLevel === 1) { // double check we didn't exit
          drawCanvas(poses, vw, vh, canvasRef);
          handlePushupLogic(poses);
        }
        if (!isReady) setIsReady(true);
      }
      
      if (stateRef.current.count < panicPushupsTarget && activeLevel === 1) {
        requestAnimationId = requestAnimationFrame(detectPose);
      }
    };

    detectPose();
    return () => { if (requestAnimationId) cancelAnimationFrame(requestAnimationId); };
  }, [model, isReady, activeLevel, panicPushupsTarget]);

  const calculateAngle = (A, B, C) => {
    const radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    return angle > 180.0 ? 360 - angle : angle;
  };

  const handlePushupLogic = (poses) => {
    if (!poses || poses.length === 0) return;
    const keypoints = poses[0].keypoints;
    const ls = keypoints.find(k => k.name === 'left_shoulder');
    const le = keypoints.find(k => k.name === 'left_elbow');
    const lw = keypoints.find(k => k.name === 'left_wrist');
    const rs = keypoints.find(k => k.name === 'right_shoulder');
    const re = keypoints.find(k => k.name === 'right_elbow');
    const rw = keypoints.find(k => k.name === 'right_wrist');

    const minConf = 0.5;
    let lAngle = null, rAngle = null;
    
    if (ls?.score > minConf && le?.score > minConf && lw?.score > minConf && lw.y > ls.y) {
       lAngle = calculateAngle(ls, le, lw);
    }
    if (rs?.score > minConf && re?.score > minConf && rw?.score > minConf && rw.y > rs.y) {
       rAngle = calculateAngle(rs, re, rw);
    }

    let currentAngle = lAngle !== null && rAngle !== null ? (lAngle + rAngle) / 2 : lAngle || rAngle;
    if (!currentAngle) return;

    // Check if body is somewhat horizontal (prevent standing bicep curls from counting)
    const lh = keypoints.find(k => k.name === 'left_hip');
    const rh = keypoints.find(k => k.name === 'right_hip');
    let isHorizontal = false;
    
    if (ls && lh && ls.score > minConf && lh.score > minConf) {
      const dx = Math.abs(lh.x - ls.x);
      const dy = Math.abs(lh.y - ls.y);
      if (dx > dy * 0.5) isHorizontal = true; // Torso is not completely vertical
    }
    if (rs && rh && rs.score > minConf && rh.score > minConf) {
      const dx = Math.abs(rh.x - rs.x);
      const dy = Math.abs(rh.y - rs.y);
      if (dx > dy * 0.5) isHorizontal = true;
    }

    // Only process pushup logic if we detect a somewhat horizontal body
    if (!isHorizontal) return;

    // Apply Exponential Moving Average to smooth out AI noise
    if (!stateRef.current.smoothedAngle) stateRef.current.smoothedAngle = currentAngle;
    stateRef.current.smoothedAngle = stateRef.current.smoothedAngle * 0.7 + currentAngle * 0.3;
    let activeAngle = stateRef.current.smoothedAngle;

    const { pushupState } = stateRef.current;
    const now = Date.now();
    const lastRepTime = stateRef.current.lastRepTime || 0;
    const downStartTime = stateRef.current.downStartTime || 0;
    
    if (activeAngle > 150) { // Arm almost fully straight
      if (pushupState === 'down') {
        // Require at least 400ms to go down and up, and max 1 rep per 1.2s to prevent noise bursts
        if ((now - downStartTime) > 400 && (now - lastRepTime) > 1200) {
          stateRef.current.count += 1;
          stateRef.current.pushupState = 'up';
          stateRef.current.lastRepTime = now;
          setPushupCount(stateRef.current.count);
        } else if ((now - downStartTime) < 400) {
          // It was a glitch, revert to 'up'
          stateRef.current.pushupState = 'up';
        }
      }
    } else if (activeAngle < 90) { // Arm bent 90 degrees or more
      if (pushupState === 'up') {
        stateRef.current.pushupState = 'down';
        stateRef.current.downStartTime = now;
      }
    }
  };

  const drawCanvas = (poses, vw, vh, canvas) => {
    if(!canvas.current) return;
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, vw, vh);
    if (poses && poses.length > 0) {
      const keypoints = poses[0].keypoints;
      keypoints.forEach((k) => {
        if (k.score > 0.15) {
          ctx.beginPath(); ctx.arc(k.x, k.y, 6, 0, 3 * Math.PI);
          ctx.fillStyle = '#044eda'; ctx.fill();
        }
      });
      const pairs = window.poseDetection.util.getAdjacentPairs(window.poseDetection.SupportedModels.MoveNet);
      pairs.forEach((pair) => {
        const kp1 = keypoints[pair[0]], kp2 = keypoints[pair[1]];
        if (kp1.score > 0.15 && kp2.score > 0.15) {
          ctx.beginPath(); ctx.moveTo(kp1.x, kp1.y); ctx.lineTo(kp2.x, kp2.y);
          ctx.lineWidth = 4; ctx.strokeStyle = '#044eda'; ctx.stroke();
        }
      });
    }
  };

  // Timer logic for Levels 2 and 4
  useEffect(() => {
    let interval;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerActive) {
      setIsTimerActive(false);
      if (activeLevel === 4) closePanicRoom(); // Auto-close Level 4
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds, activeLevel, closePanicRoom]);

  const startLevel2 = () => {
    setActiveLevel(2);
    setTimerSeconds(10 * 60); // 10 minutes
    setIsTimerActive(true);
  };

  const startLevel4 = () => {
    setActiveLevel(4);
    setTimerSeconds(5 * 60); // 5 minutes
    setIsTimerActive(true);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isLevel1Completed = pushupCount >= panicPushupsTarget;

  return (
    <div className="panic-room-overlay">
      
      {!activeLevel && (
        <div className="panic-menu-container glass-panel animate-fade-in" style={{ width: '90%', maxWidth: '400px', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#ef4444', margin: 0, fontSize: '1.2rem' }}>PROTOCOLOS DE EMERGENCIA</h2>
            <button onClick={() => setShowSettings(!showSettings)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
              <Settings size={20} />
            </button>
          </div>
          
          {showSettings && (
            <div style={{ marginBottom: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#aaa' }}>
                Meta de flexiones (Nivel 1):
              </label>
              <input 
                type="number" 
                value={panicPushupsTarget}
                onChange={(e) => setPanicPushupsTarget(Math.max(1, parseInt(e.target.value) || 20))}
                style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: 'white', borderRadius: '8px' }}
              />
            </div>
          )}

          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '25px', lineHeight: '1.5' }}>
            Selecciona el nivel de intervención según la intensidad del impulso.
          </p>

          <div className="panic-levels-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button className="panic-level-btn" onClick={() => setActiveLevel(1)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
              <Activity size={24} color="var(--accent-neon)" />
              <div style={{ textAlign: 'left' }}>
                <strong>Nivel 1: Choque Físico</strong>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>{panicPushupsTarget} Flexiones detectadas por IA</div>
              </div>
            </button>
            <button className="panic-level-btn" onClick={startLevel2} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
              <Target size={24} color="var(--accent-neon)" />
              <div style={{ textAlign: 'left' }}>
                <strong>Nivel 2: Reset Ambiental</strong>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>Caminata obligatoria de 10 minutos</div>
              </div>
            </button>
            <button className="panic-level-btn" onClick={() => setActiveLevel(3)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
              <Phone size={24} color="var(--accent-neon)" />
              <div style={{ textAlign: 'left' }}>
                <strong>Nivel 3: Apoyo Social</strong>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>Llamada a contacto de confianza</div>
              </div>
            </button>
            <button className="panic-level-btn" onClick={startLevel4} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
              <Lock size={24} color="#ef4444" />
              <div style={{ textAlign: 'left' }}>
                <strong style={{ color: '#ef4444' }}>Nivel 4: Bloqueo Total</strong>
                <div style={{ fontSize: '12px', opacity: 0.7, color: '#ef4444' }}>Bloqueo de apps por 5 minutos</div>
              </div>
            </button>
          </div>

          <button onClick={closePanicRoom} style={{ marginTop: '25px', width: '100%', padding: '15px', background: 'transparent', border: '1px solid #444', color: '#fff', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            CANCELAR
          </button>
        </div>
      )}

      {activeLevel === 1 && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="panic-security-badge">
            <ShieldCheck size={16} /> 100% PRIVADO. EL VIDEO SE PROCESA LOCALMENTE.
          </div>
          <div className="panic-header">
            <button className="back-btn" onClick={() => setActiveLevel(null)} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '15px' }}><ChevronLeft /> Volver</button>
            <h1 className="panic-title">CHOQUE FÍSICO</h1>
            <p className="panic-subtitle">El impulso está secuestrando tu cerebro. Transmuta la energía. No podrás salir hasta completar el objetivo.</p>
          </div>
          <div className="camera-container">
            {!isReady && (
              <div className="loading-model">
                <div className="spinner"></div><span>Iniciando IA...</span>
              </div>
            )}
            <Webcam ref={webcamRef} audio={false} mirrored={true} style={{ opacity: isReady ? 1 : 0 }} />
            <canvas ref={canvasRef} style={{ transform: 'scaleX(-1)' }} />
          </div>
          
          <button 
            onClick={() => setActiveLevel(2)} 
            style={{ margin: '15px auto 0', background: 'none', border: '1px underline #888', color: '#888', cursor: 'pointer', fontSize: '12px' }}
          >
            ¿No te detecta bien? Cambiar a Nivel 2 (Reset Ambiental)
          </button>

          <div className="panic-counter">
            <span className={`counter-number ${isLevel1Completed ? 'completed' : ''}`}>{pushupCount}</span>
            <span className="counter-target">/ {panicPushupsTarget} FLEXIONES</span>
            {isLevel1Completed && <button className="btn-finish-panic" onClick={closePanicRoom}>IMPULSO CONTROLADO. SALIR.</button>}
          </div>
        </div>
      )}

      {activeLevel === 2 && (
        <div className="panic-timer-view animate-fade-in" style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
          <h1 style={{ color: 'var(--accent-neon)', marginBottom: '10px', fontSize: '2rem' }}>RESET AMBIENTAL</h1>
          <p style={{ color: '#aaa', marginBottom: '40px' }}>Sal de tu habitación. Camina. Respira. Cambia de entorno inmediatamente.</p>
          
          <div style={{ fontSize: '6rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '5px', margin: '40px 0', textShadow: '0 0 20px rgba(0, 229, 255, 0.5)' }}>
            {formatTime(timerSeconds)}
          </div>
          
          {timerSeconds === 0 ? (
             <button className="btn-finish-panic" onClick={closePanicRoom} style={{ marginTop: '20px', padding: '15px 30px', borderRadius: '12px', background: 'var(--accent-neon)', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>MISIÓN CUMPLIDA</button>
          ) : (
            <button onClick={() => setActiveLevel(null)} style={{ background: 'transparent', border: '1px solid #444', color: '#fff', padding: '15px 30px', borderRadius: '12px', marginTop: '40px', cursor: 'pointer' }}>
              Abandonar (No recomendado)
            </button>
          )}
        </div>
      )}

      {activeLevel === 3 && (
        <div className="panic-timer-view animate-fade-in" style={{ textAlign: 'center', width: '100%', padding: '20px', maxWidth: '400px' }}>
          <button className="back-btn" onClick={() => setActiveLevel(null)} style={{ position: 'absolute', top: '30px', left: '20px', background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', cursor: 'pointer' }}><ChevronLeft /> Volver</button>
          <Phone size={64} color="var(--accent-neon)" style={{ margin: '0 auto 20px' }} />
          <h1 style={{ marginBottom: '15px' }}>APOYO SOCIAL</h1>
          <p style={{ color: '#aaa', marginBottom: '40px', lineHeight: '1.5' }}>
            No tienes que luchar solo. Llama a tu compañero de responsabilidad o contacto de confianza. Verbalizar el problema destruye su poder.
          </p>
          
          <a href="tel:" className="btn-finish-panic" onClick={() => closePanicRoom()} style={{ display: 'block', textDecoration: 'none', background: 'var(--accent-neon)', color: 'black', marginBottom: '15px', padding: '15px', borderRadius: '12px', fontWeight: 'bold' }}>
            ABRIR AGENDA PARA LLAMAR
          </a>
          <p style={{ fontSize: '12px', color: '#666' }}>Se abrirá el selector nativo de contactos de tu teléfono.</p>
        </div>
      )}

      {activeLevel === 4 && (
        <div className="panic-timer-view animate-fade-in" style={{ textAlign: 'center', width: '100%', height: '100vh', padding: '20px', background: '#0a0a0f', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Lock size={64} color="#ef4444" style={{ margin: '0 auto 20px' }} />
          <h1 style={{ color: '#ef4444', marginBottom: '15px', letterSpacing: '2px' }}>BLOQUEO ACTIVO</h1>
          <p style={{ color: '#aaa', marginBottom: '40px', maxWidth: '300px', lineHeight: '1.5' }}>
            Navegadores y redes sociales bloqueados a nivel de sistema. Esta pantalla no se puede cerrar hasta que pase el tiempo de crisis.
          </p>
          
          <div style={{ fontSize: '5rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '5px', margin: '20px 0', color: '#ef4444', textShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}>
            {formatTime(timerSeconds)}
          </div>
          
          <p style={{ fontSize: '13px', color: '#666', marginTop: '40px' }}>
            *(Simulación UI MVP)*<br/>En la versión nativa de Android, se usará <code>UsageStatsManager</code> y <code>SYSTEM_ALERT_WINDOW</code>.
          </p>
        </div>
      )}

    </div>
  );
};

export default PanicRoom;
