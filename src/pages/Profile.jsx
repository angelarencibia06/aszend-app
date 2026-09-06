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
    <div className="page-container" style={{ padding: '20px', paddingBottom: '160px', color: '#fff', height: '100%', overflowY: 'auto', position: 'relative' }}>
      
      {/* Subtle Background Glow */}
      <div style={{ position: 'absolute', top: '-100px', right: '-50px', width: '300px', height: '300px', background: `radial-gradient(circle, ${activeRankDef.color1}22 0%, transparent 70%)`, filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '100px', left: '-50px', width: '250px', height: '250px', background: `radial-gradient(circle, ${activeRankDef.color2}15 0%, transparent 70%)`, filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h1 style={{ fontSize: '28px', margin: 0, fontFamily: 'Oswald', textTransform: 'uppercase', letterSpacing: '1px' }}>MI PERFIL</h1>
        </div>

        {/* User Card - High End Glass */}
        <div className="glass-panel" style={{ 
          display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', borderRadius: '24px', marginBottom: '30px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}>
          <div 
            onClick={() => fileInputRef.current.click()}
            style={{ 
              width: '80px', height: '80px', borderRadius: '20px', 
              background: avatar ? `url(${avatar}) center/cover` : 'rgba(0,0,0,0.5)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', 
              border: `1.5px solid ${activeRankDef.color1}`,
              boxShadow: `0 0 20px ${activeRankDef.color1}40`
            }}
          >
            {!avatar && <Camera size={28} color={activeRankDef.color1} opacity="0.8" />}
            
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
          
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '26px', fontFamily: 'Oswald', textTransform: 'uppercase', letterSpacing: '1px' }}>{userProfile?.name || 'Usuario'}</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: `linear-gradient(90deg, ${activeRankDef.color1}22, transparent)`, padding: '4px 12px 4px 6px', borderRadius: '4px', borderLeft: `2px solid ${activeRankDef.color1}` }}>
              <p style={{ margin: 0, color: activeRankDef.color1, fontSize: '11px', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                NIVEL {activeRankDef.level}: {activeRankDef.name}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid - Unified Color Scheme */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '35px' }}>
          {[
            { label: 'Racha Actual', value: `${streak} DÍAS`, icon: Flame },
            { label: 'Mejor Racha', value: `${Math.max(streak, 47)} DÍAS`, icon: Trophy },
            { label: 'Miembro Desde', value: '18 AGO 2025', icon: Calendar },
            { label: 'Hábitos Hoy', value: `${habitsPercent}%`, icon: CheckSquare }
          ].map((stat, i) => (
            <div key={i} className="glass-panel" style={{ 
              padding: '16px', borderRadius: '16px',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <stat.icon size={14} color={activeRankDef.color1} opacity="0.8" />
                <span style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
              </div>
              <p style={{ margin: 0, fontSize: '20px', fontFamily: 'Oswald', fontWeight: '500', letterSpacing: '0.5px' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Menu List Items - Sleek Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 10px 4px' }}>Sistema y Configuración</h3>
          
          <div onClick={() => setActiveMenu('ranks')} className="glass-panel profile-menu-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderRadius: '16px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={`/ranks/rank${activeRankDef.level}.png`} alt={activeRankDef.name} style={{ width: 24, height: 24, objectFit: "contain" }} onError={(e) => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} /><Swords size={22} color={activeRankDef.color1} style={{ opacity: 0.7, display: "none" }} />
              <div>
                <p style={{ margin: '0 0 3px 0', fontWeight: '600', fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Rangos de Ascensión</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>{unlockedRanksCount}/5 Desbloqueados</p>
              </div>
            </div>
            <ChevronRight size={20} color="#4b5563" />
          </div>

          <div onClick={() => setActiveMenu('badges')} className="glass-panel profile-menu-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderRadius: '16px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Medal size={22} color="#FBBF24" style={{ opacity: 1 }} />
              <div>
                <p style={{ margin: '0 0 3px 0', fontWeight: '600', fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Insignias y Logros</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>{unlockedBadgesCount}/{BADGES.length} Adquiridas</p>
              </div>
            </div>
            <ChevronRight size={20} color="#4b5563" />
          </div>

          <div onClick={() => setActiveMenu('settings')} className="glass-panel profile-menu-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderRadius: '16px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Settings size={22} color="#9ca3af" style={{ opacity: 1 }} />
              <div>
                <p style={{ margin: '0 0 3px 0', fontWeight: '600', fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Configuración</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>Cuenta, Privacidad y Alertas</p>
              </div>
            </div>
            <ChevronRight size={20} color="#4b5563" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && renderSubMenu()}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
