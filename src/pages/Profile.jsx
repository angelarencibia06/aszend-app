import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Flame, Trophy, Calendar, CheckSquare, Swords, Medal, ChevronRight, ChevronLeft, Camera, Bell, Shield, LogOut, Lock, Star, Target, Crown, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/Home2.css';

const RANKS = [
  { id: 1, name: 'PULSO', number: '01', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', color1: '#fcd34d', color2: '#d97706', shadow: 'rgba(252, 211, 77, 0.5)', req: 365, level: 5 },
];

const BADGES = [
  { id: 1, name: 'Primer Paso', desc: '1 día limpio', icon: Flame, color: '#ef4444', req: 1 },
  { id: 2, name: 'Despertar', desc: '3 días limpios', icon: Zap, color: '#f97316', req: 3 },
  { id: 3, name: 'Constancia', desc: '1 semana', icon: Target, color: '#f59e0b', req: 7 },
  { id: 4, name: 'Voluntad', desc: '14 días limpios', icon: Shield, color: '#84cc16', req: 14 },
  { id: 5, name: 'Imparable', desc: '21 días limpios', icon: Star, color: '#10b981', req: 21 },
  { id: 6, name: 'Disciplina', desc: '1 mes entero', icon: Trophy, color: '#0ea5e9', req: 30 },
  { id: 7, name: 'Acero', desc: '2 meses limpios', icon: Swords, color: '#3b82f6', req: 60 },
  { id: 8, name: 'Maestro', desc: '90 días limpios', icon: Medal, color: '#8b5cf6', req: 90 },
  { id: 9, name: 'Leyenda', desc: 'Medio año', icon: Crown, color: '#d946ef', req: 180 },
  { id: 10, name: 'Dios', desc: '1 año completo', icon: Crown, color: '#f43f5e', req: 365 },
];

const Profile = () => {
  const { streak, userProfile, habits, habitLogs, setActiveMilestone } = useAppContext();
  const [activeMenu, setActiveMenu] = useState(null);
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || null);
  const fileInputRef = useRef(null);

  const todayStr = new Date().toLocaleDateString('sv-SE');
  const safeHabits = Array.isArray(habits) ? habits : [];
  const safeHabitLogs = habitLogs || {};
  const activeHabits = safeHabits.filter(h => h.active);
  const todayLogs = safeHabitLogs[todayStr] || {};
  const completedHabitsCount = Object.values(todayLogs).filter(l => l.completed).length;
  const habitsPercent = activeHabits.length > 0 ? Math.round((completedHabitsCount / activeHabits.length) * 100) : 0;

  const currentStreak = streak || 0;
  
  let activeRankDef = RANKS[0];
  let unlockedRanksCount = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (currentStreak >= RANKS[i].req) {
      activeRankDef = RANKS[i];
      unlockedRanksCount = i + 1;
    }
  }

  const unlockedBadgesCount = BADGES.filter(b => currentStreak >= b.req).length;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem('userAvatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSubMenu = () => {
    if (activeMenu === 'ranks') {
      return (
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#050505', zIndex: 100, overflowY: 'auto', padding: '20px', paddingBottom: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <button onClick={() => setActiveMenu(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
              <ChevronLeft size={24} />
            </button>
            <h2 style={{ fontSize: '22px', margin: 0, fontFamily: 'Oswald', letterSpacing: '1px' }}>RANGOS DE ASCENSIÓN</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {RANKS.map((rank) => {
              const locked = currentStreak < rank.req;
              const isCurrent = rank.id === activeRankDef.id;
              
              return (
                <div key={rank.id} className="glass-panel" style={{ padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', border: isCurrent ? `1px solid ${rank.color1}` : '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                  {isCurrent && <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: rank.color1 }} />}
                  
                  <div style={{ width: '60px', height: '60px', flexShrink: 0, opacity: locked ? 0.3 : 1, filter: locked ? 'grayscale(100%)' : 'none' }}>
                    <div className="sphere-wrapper" style={{ width: '100%', height: '100%' }}>
                      <div className={`sphere ${isCurrent ? 'animated-sphere' : ''}`} style={{ background: `radial-gradient(circle at 35% 35%, ${rank.color1}, ${rank.color2})`, boxShadow: !locked ? `inset -5px -5px 10px rgba(0,0,0,0.5)` : 'none' }}>
                        <div className={`orbital-ring ${isCurrent ? 'spinning-ring' : ''}`}></div>
                        <div className="highlight"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: locked ? '#6b7280' : '#fff', letterSpacing: '1px' }}>{rank.name}</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>{locked ? `Requiere ${rank.req} días` : 'Desbloqueado'}</p>
                  </div>
                  
                  {locked && <Lock size={20} color="#6b7280" />}
                  {isCurrent && <span style={{ background: `${rank.color2}30`, color: rank.color1, padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>ACTUAL</span>}
                </div>
              );
            })}
          </div>
        </motion.div>
      );
    }
    
    if (activeMenu === 'badges') {
      return (
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#050505', zIndex: 100, overflowY: 'auto', padding: '20px', paddingBottom: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <button onClick={() => setActiveMenu(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
              <ChevronLeft size={24} />
            </button>
            <h2 style={{ fontSize: '22px', margin: 0, fontFamily: 'Oswald', letterSpacing: '1px' }}>INSIGNIAS Y LOGROS</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {BADGES.map(badge => {
              const locked = currentStreak < badge.req;
              const Icon = badge.icon;
              return (
                <div key={badge.id} className="glass-panel" style={{ padding: '20px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', opacity: locked ? 0.5 : 1 }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: locked ? 'rgba(255,255,255,0.05)' : `${badge.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', position: 'relative' }}>
                    {locked ? <Lock size={24} color="#6b7280" /> : <Icon size={24} color={badge.color} />}
                  </div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>{badge.name}</h3>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      );
    }
    
    if (activeMenu === 'settings') {
      return (
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#050505', zIndex: 100, overflowY: 'auto', padding: '20px', paddingBottom: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <button onClick={() => setActiveMenu(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
              <ChevronLeft size={24} />
            </button>
            <h2 style={{ fontSize: '22px', margin: 0, fontFamily: 'Oswald', letterSpacing: '1px' }}>CONFIGURACIÓN</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="glass-panel" style={{ padding: '15px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Bell size={20} color="#60a5fa" />
                <span>Notificaciones Diarias</span>
              </div>
              <div style={{ width: '40px', height: '24px', background: '#3b82f6', borderRadius: '12px', position: 'relative' }}>
                <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', right: '3px' }}></div>
              </div>
            </div>
            
            <div className="glass-panel" style={{ padding: '15px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Shield size={20} color="#10b981" />
                <span>Privacidad de Datos</span>
              </div>
              <ChevronRight size={20} color="#6b7280" />
            </div>
            
            {/* DEV TOOL TO TEST MILESTONE */}
            <div className="glass-panel" onClick={() => setActiveMilestone(activeRankDef.req)} style={{ padding: '15px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Zap size={20} color="#eab308" />
                <span>Probar Animación de Logro (Dev)</span>
              </div>
              <ChevronRight size={20} color="#6b7280" />
            </div>

            <div className="glass-panel" style={{ padding: '15px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#ef4444' }}>
                <LogOut size={20} />
                <span style={{ fontWeight: 'bold' }}>Cerrar Sesión</span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    
    return null;
  };

  return (
    <div className="page-container" style={{ color: '#fff', height: '100%', overflowY: 'auto', position: 'relative', background: '#02040a', paddingBottom: '120px' }}>
      
      {/* Hero Header */}
      <div style={{ position: 'relative', padding: '40px 20px 20px 20px', background: `linear-gradient(to bottom, ${activeRankDef.color2}22, transparent)`, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div 
            onClick={() => fileInputRef.current.click()}
            style={{ 
              width: '85px', height: '85px', borderRadius: '16px', 
              background: avatar ? `url(${avatar}) center/cover` : 'rgba(255,255,255,0.03)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              border: `1px solid ${activeRankDef.color1}44`,
              boxShadow: `0 0 30px ${activeRankDef.color1}22`,
              cursor: 'pointer', position: 'relative'
            }}
          >
            {!avatar && <Camera size={28} color={activeRankDef.color1} opacity="0.5" />}
            <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#02040a', border: `1px solid ${activeRankDef.color1}44`, borderRadius: '8px', padding: '6px' }}>
              <Camera size={14} color="#fff" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
          
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '32px', fontFamily: 'Oswald', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>
              {userProfile?.name || 'USUARIO'}
            </h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: `${activeRankDef.color1}15`, border: `1px solid ${activeRankDef.color1}40`, padding: '4px 12px', borderRadius: '20px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeRankDef.color1, marginRight: '8px', boxShadow: `0 0 8px ${activeRankDef.color1}` }}></div>
              <span style={{ color: activeRankDef.color1, fontSize: '11px', fontWeight: 'bold', letterSpacing: '1.5px' }}>
                NIVEL {activeRankDef.level}: {activeRankDef.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Data Strip */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ flex: 1, padding: '20px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Racha Actual</span>
          <span style={{ fontSize: '24px', fontFamily: 'Oswald' }}>{streak} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>DÍAS</span></span>
        </div>
        <div style={{ flex: 1, padding: '20px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Racha Máx</span>
          <span style={{ fontSize: '24px', fontFamily: 'Oswald' }}>{Math.max(streak, 47)} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>DÍAS</span></span>
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Hábitos Hoy</span>
          <span style={{ fontSize: '24px', fontFamily: 'Oswald' }}>{habitsPercent}<span style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'Inter' }}>%</span></span>
        </div>
      </div>

      {/* Minimalist Menu */}
      <div style={{ padding: '30px 20px' }}>
        <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Opciones del Sistema</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div onClick={() => setActiveMenu('ranks')} className="profile-menu-row">
            <div className="menu-icon-box"><Swords size={18} /></div>
            <div style={{ flex: 1 }}>
              <span className="menu-title">RANGOS DE ASCENSIÓN</span>
              <span className="menu-subtitle">{unlockedRanksCount}/5 Desbloqueados</span>
            </div>
            <ChevronRight size={18} color="#4b5563" />
          </div>

          <div onClick={() => setActiveMenu('badges')} className="profile-menu-row">
            <div className="menu-icon-box"><Medal size={18} /></div>
            <div style={{ flex: 1 }}>
              <span className="menu-title">INSIGNIAS DE HONOR</span>
              <span className="menu-subtitle">{unlockedBadgesCount}/{BADGES.length} Adquiridas</span>
            </div>
            <ChevronRight size={18} color="#4b5563" />
          </div>

          <div onClick={() => setActiveMenu('settings')} className="profile-menu-row">
            <div className="menu-icon-box"><Settings size={18} /></div>
            <div style={{ flex: 1 }}>
              <span className="menu-title">CONFIGURACIÓN</span>
              <span className="menu-subtitle">Sistema y Privacidad</span>
            </div>
            <ChevronRight size={18} color="#4b5563" />
          </div>
        </div>
        
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>ASZEND OS v2.0.4 • ID: {userProfile?.name?.toUpperCase() || 'USR-01'}</span>
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && renderSubMenu()}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
