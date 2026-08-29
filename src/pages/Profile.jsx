import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Flame, Trophy, Calendar, CheckSquare, Swords, Medal, ChevronRight, ChevronLeft, Camera, Bell, Shield, LogOut, Lock } from 'lucide-react';
import { useAppContext, getStreakData } from '../context/AppContext';
import '../styles/Home2.css'; // For sphere classes

const RANKS = [
  { id: 1, name: 'CHISPA', number: '01', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 0 },
  { id: 2, name: 'PULSO', number: '02', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 7 },
  { id: 3, name: 'NÚCLEO', number: '03', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 30 },
  { id: 4, name: 'CONVERGENCIA', number: '04', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 90 },
  { id: 5, name: 'ASCENSIÓN', number: '05', color1: '#93c5fd', color2: '#3b82f6', shadow: 'rgba(96, 165, 250, 0.5)', req: 365 },
];

const BADGES = [
  { id: 1, name: 'Primer Paso', desc: 'Completa 1 día', icon: Flame, color: '#ef4444', req: 1 },
  { id: 2, name: 'Constancia', desc: 'Racha de 7 días', icon: Trophy, color: '#f59e0b', req: 7 },
  { id: 3, name: 'Imparable', desc: 'Racha de 21 días', icon: Medal, color: '#3b82f6', req: 21 },
  { id: 4, name: 'Maestro', desc: 'Racha de 90 días', icon: Swords, color: '#a855f7', req: 90 },
];

const Profile = () => {
  const { streak, userProfile, habits, habitLogs } = useAppContext();
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
  
  // Calculate Ranks
  let activeRankDef = RANKS[0];
  let unlockedRanksCount = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (currentStreak >= RANKS[i].req) {
      activeRankDef = RANKS[i];
      unlockedRanksCount = i + 1;
    }
  }

  // Calculate Badges
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
            {RANKS.map((rank, i) => {
              const locked = currentStreak < rank.req;
              const isCurrent = rank.id === activeRankDef.id;
              
              return (
                <div key={rank.id} className="glass-panel" style={{ padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', border: isCurrent ? `1px solid ${rank.color1}` : '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                  {isCurrent && <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: rank.color1 }} />}
                  
                  <div style={{ width: '60px', height: '60px', flexShrink: 0, opacity: locked ? 0.3 : 1, filter: locked ? 'grayscale(100%)' : 'none' }}>
                    <div className="sphere-wrapper" style={{ width: '100%', height: '100%' }}>
                      <div className="sphere" style={{ background: `radial-gradient(circle at 35% 35%, ${rank.color1}, ${rank.color2})`, boxShadow: !locked ? `inset -5px -5px 10px rgba(0,0,0,0.5)` : 'none' }}>
                        <div className="orbital-ring"></div>
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
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: locked ? 'rgba(255,255,255,0.05)' : `${badge.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
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
    <div className="page-container" style={{ padding: '20px', paddingBottom: '160px', color: '#fff', height: '100%', overflowY: 'auto', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', margin: 0, fontFamily: 'Oswald', textTransform: 'uppercase' }}>Mi Perfil</h1>
        <button onClick={() => setActiveMenu('settings')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
          <Settings size={20} />
        </button>
      </div>

      {/* User Card with Interactive Avatar */}
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '20px', marginBottom: '20px' }}>
        <div 
          onClick={() => fileInputRef.current.click()}
          style={{ width: '70px', height: '70px', borderRadius: '50%', background: avatar ? `url(${avatar}) center/cover` : 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', border: `2px solid ${activeRankDef.color1}` }}
        >
          {!avatar && <Camera size={24} color={activeRankDef.color1} />}
          <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: activeRankDef.color1, borderRadius: '50%', padding: '4px' }}>
            <Camera size={12} color="#fff" />
          </div>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
        
        <div>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', textTransform: 'uppercase' }}>{userProfile?.name || 'Usuario'}</h2>
          <p style={{ margin: 0, color: activeRankDef.color1, fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px' }}>RANGO: {activeRankDef.name}</p>
          <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)', fontSize: '12px' }}>Rango de Ascensión</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        <div className="glass-panel" style={{ padding: '15px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Flame size={16} color="#ef4444" />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Racha actual</span>
          </div>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{streak} días</p>
        </div>

        <div className="glass-panel" style={{ padding: '15px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Trophy size={16} color="#f59e0b" />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mejor racha</span>
          </div>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{Math.max(streak, 47)} días</p>
        </div>

        <div className="glass-panel" style={{ padding: '15px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Calendar size={16} color="#8b5cf6" />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Miembro desde</span>
          </div>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>18 Ago 2025</p>
        </div>

        <div className="glass-panel" style={{ padding: '15px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <CheckSquare size={16} color="#10b981" />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hábitos hoy</span>
          </div>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{habitsPercent}%</p>
        </div>
      </div>

      {/* Menu List Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div onClick={() => setActiveMenu('ranks')} className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderRadius: '16px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Swords size={20} color="#a78bfa" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', fontWeight: '600', fontSize: '15px' }}>Rangos de Ascensión</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>{activeRankDef.name} - {unlockedRanksCount}/5 desbloqueados</p>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>

        <div onClick={() => setActiveMenu('badges')} className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderRadius: '16px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Medal size={20} color="#fcd34d" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', fontWeight: '600', fontSize: '15px' }}>Insignias y Logros</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>{unlockedBadgesCount}/{BADGES.length} desbloqueadas</p>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>

        <div onClick={() => setActiveMenu('settings')} className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderRadius: '16px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={20} color="#9ca3af" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', fontWeight: '600', fontSize: '15px' }}>Configuración</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Cuenta, notificaciones, privacidad...</p>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && renderSubMenu()}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
