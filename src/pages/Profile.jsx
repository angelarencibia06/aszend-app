import React from 'react';
import { Settings, Flame, Trophy, Calendar, CheckSquare, Swords, Medal, ChevronRight } from 'lucide-react';
import { useAppContext, getStreakData } from '../context/AppContext';

const Profile = () => {
  const { streak, userProfile, habits, habitLogs } = useAppContext();

  // Basic logic for stats
  const todayStr = new Date().toLocaleDateString('sv-SE');
  const safeHabits = Array.isArray(habits) ? habits : [];
  const safeHabitLogs = habitLogs || {};
  const activeHabits = safeHabits.filter(h => h.active);
  const todayLogs = safeHabitLogs[todayStr] || {};
  const completedHabitsCount = Object.values(todayLogs).filter(l => l.completed).length;
  const habitsPercent = activeHabits.length > 0 ? Math.round((completedHabitsCount / activeHabits.length) * 100) : 0;

  const streakData = getStreakData(streak);

  return (
    <div className="page-container" style={{ padding: '20px', paddingBottom: '160px', color: '#fff', height: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', margin: 0, fontFamily: 'Oswald' }}>Mi Perfil</h1>
        <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
          <Settings size={20} />
        </button>
      </div>

      {/* User Card */}
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '20px', marginBottom: '20px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Swords size={28} color="var(--accent-neon)" />
        </div>
        <div>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>{userProfile?.name || 'Brian'}</h2>
          <p style={{ margin: 0, color: 'var(--accent-neon)', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px' }}>{streakData.title.toUpperCase()}</p>
          <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)', fontSize: '12px' }}>Rango de Ascension</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        <div className="glass-panel" style={{ padding: '15px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Flame size={16} color="#ef4444" />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Racha actual</span>
          </div>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{streak} días</p>
        </div>

        <div className="glass-panel" style={{ padding: '15px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Trophy size={16} color="#f59e0b" />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mejor racha</span>
          </div>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{Math.max(streak, 47)} días</p>
        </div>

        <div className="glass-panel" style={{ padding: '15px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Calendar size={16} color="#8b5cf6" />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Miembro desde</span>
          </div>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>18 ago 2025</p>
        </div>

        <div className="glass-panel" style={{ padding: '15px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <CheckSquare size={16} color="#10b981" />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hábitos hoy</span>
          </div>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{habitsPercent}%</p>
        </div>
      </div>

      {/* List Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderRadius: '16px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Swords size={20} color="#a78bfa" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', fontWeight: '600', fontSize: '15px' }}>Rangos de Ascension</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Guerrero - 3/5 desbloqueados</p>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>

        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderRadius: '16px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Medal size={20} color="#fcd34d" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', fontWeight: '600', fontSize: '15px' }}>Insignias y Logros</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>4/8 desbloqueadas</p>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>

        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderRadius: '16px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={20} color="#9ca3af" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', fontWeight: '600', fontSize: '15px' }}>Configuracion</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Cuenta, notificaciones, privacid...</p>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>
      </div>

    </div>
  );
};

export default Profile;
