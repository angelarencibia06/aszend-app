import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, X, Target, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import '../styles/App.css';

const Habits = () => {
  const { habits, setHabits, habitLogs, setHabitsLogs, triggerPanicRoom } = useAppContext();
  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' or 'stats'
  const [timeFilter, setTimeFilter] = useState('Semana'); // 'Semana', 'Mes', 'Trimestre', 'Año'
  
  // Custom Modal State
  const [modalState, setModalState] = useState({ isOpen: false, type: 'add', habitId: null, initialValue: '' });
  const [modalInputValue, setModalInputValue] = useState('');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, habitId: null });

  const todayStr = new Date().toLocaleDateString('sv-SE');
  
  // Logic
  const visibleHabits = habits.filter(h => h.active);
  const totalVisible = visibleHabits.length;
  const completedCount = visibleHabits.filter(h => habitLogs[todayStr]?.[h.id]?.completed).length;
  const progressPercent = totalVisible === 0 ? 0 : Math.round((completedCount / totalVisible) * 100);

  const toggleHabit = (id) => {
    const todayLogs = { ...(habitLogs[todayStr] || {}) };
    const isCompleted = todayLogs[id]?.completed;
    
    if (isCompleted) {
      delete todayLogs[id];
    } else {
      todayLogs[id] = { completed: true, source: 'manual' };
    }
    
    setHabitsLogs({
      ...habitLogs,
      [todayStr]: todayLogs
    });
  };

  const openAddModal = () => {
    const activeCount = habits.filter(h => h.active).length;
    if (activeCount >= 10) {
      alert("Has alcanzado el límite máximo de 10 hábitos activos.");
      return;
    }
    setModalInputValue('');
    setModalState({ isOpen: true, type: 'add', habitId: null, initialValue: '' });
  };

  const openEditModal = (id, currentName) => {
    setModalInputValue(currentName);
    setModalState({ isOpen: true, type: 'edit', habitId: id, initialValue: currentName });
  };

  const handleModalSubmit = () => {
    const name = modalInputValue.trim();
    if (!name) return;

    if (modalState.type === 'add') {
      const newHabit = {
        id: 'habit_' + Date.now(),
        name: name,
        active: true,
        created_at: Date.now()
      };
      setHabits([...habits, newHabit]);
    } else if (modalState.type === 'edit') {
      setHabits(habits.map(h => h.id === modalState.habitId ? { ...h, name: name } : h));
    }
    setModalState({ ...modalState, isOpen: false });
  };

  const requestDelete = (id) => {
    setConfirmModal({ isOpen: true, habitId: id });
  };

  const confirmDelete = () => {
    setHabits(habits.map(h => h.id === confirmModal.habitId ? { ...h, active: false } : h));
    setConfirmModal({ isOpen: false, habitId: null });
  };

  // Stats Logic - Robust & Professional
  const calculateStats = () => {
    let currentStreak = 0;
    let totalCompleted = 0;
    let totalPossible = 0;
    const habitStats = {};
    const chartData = [];
    
    let lookbackDays = 7;
    if (timeFilter === 'Mes') lookbackDays = 30;
    if (timeFilter === 'Trimestre') lookbackDays = 90;
    if (timeFilter === 'Año') lookbackDays = 365;

    const activeHabits = habits.filter(h => h.active);
    activeHabits.forEach(h => {
      habitStats[h.id] = { name: h.name, completed: 0, total: 0 }; 
    });

    for(let i=lookbackDays-1; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const endOfDayTs = d.setHours(23, 59, 59, 999);
      const dStr = new Date(endOfDayTs).toLocaleDateString('sv-SE');
      const dayLogs = habitLogs[dStr] || {};
      
      let dayPossible = 0;
      let dayCompleted = 0;

      activeHabits.forEach(h => {
        // Only count habit as possible if it existed on that day
        const createdTs = h.created_at || 0; // Assume 0 if legacy
        if (createdTs <= endOfDayTs) {
          dayPossible++;
          habitStats[h.id].total++;
          if (dayLogs[h.id]?.completed) {
            dayCompleted++;
            habitStats[h.id].completed++;
          }
        }
      });

      totalCompleted += dayCompleted;
      totalPossible += dayPossible;

      const dayPct = dayPossible > 0 ? Math.round((dayCompleted / dayPossible) * 100) : 0;
      // For large datasets, don't label every single point to avoid crowding
      const label = (lookbackDays <= 30 || i % Math.ceil(lookbackDays / 10) === 0) ? dStr.slice(-5) : '';
      chartData.push({ name: label, uv: dayPct });
    }

    const percentage = totalPossible === 0 ? 0 : Math.round((totalCompleted / totalPossible) * 100);
    const bestHabits = Object.values(habitStats)
      .filter(h => h.total > 0)
      .map(h => ({ ...h, pct: Math.round((h.completed / h.total) * 100) }))
      .sort((a,b) => b.pct - a.pct)
      .slice(0, 3);

    return { percentage, currentStreak, totalCompleted, bestHabits, chartData };
  };

  const stats = activeTab === 'stats' ? calculateStats() : null;

  return (
    <div className="page-container" style={{ padding: '20px', paddingBottom: '160px', color: '#fff', height: '100%', overflowY: 'auto', position: 'relative' }}>
      
      {activeTab === 'tracker' ? (
        <>
          {/* Header */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' }}>Mis Habitos</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>Pequeñas acciones. Grandes cambios.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', boxShadow: '0 0 20px rgba(37,99,235,0.15)' }}>
              <Target size={24} color="#3b82f6" strokeWidth={2.5} />
            </div>
          </div>

          {/* Progress Card */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{completedCount}/{totalVisible} completados hoy</span>
              <span style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--accent-neon)' }}>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--accent-neon)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>

          {/* Habits List Card */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>HABITOS DE HOY</span>
              <button 
                onClick={() => setActiveTab('stats')}
                style={{ background: 'none', border: 'none', color: 'var(--accent-neon)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ESTADÍSTICAS
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {visibleHabits.map((habit, index) => {
                const isChecked = !!habitLogs[todayStr]?.[habit.id]?.completed;
                return (
                  <div key={habit.id} style={{ 
                    display: 'flex', alignItems: 'center', padding: '15px 0', 
                    borderBottom: index < visibleHabits.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' 
                  }}>
                    
                    {/* Custom Circle Checkbox */}
                    <div 
                      onClick={() => toggleHabit(habit.id)}
                      style={{ 
                        width: '24px', height: '24px', borderRadius: '50%', 
                        border: isChecked ? 'none' : '2px solid rgba(255,255,255,0.2)',
                        background: isChecked ? 'var(--accent-neon)' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginRight: '15px', cursor: 'pointer', flexShrink: 0
                      }}
                    >
                      {isChecked && (
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>

                    <span style={{ flex: 1, fontSize: '16px', fontWeight: '500', color: isChecked ? '#fff' : '#ccc' }}>
                      {habit.name}
                    </span>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button onClick={() => openEditModal(habit.id, habit.name)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => requestDelete(habit.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                );
              })}
              
              {visibleHabits.length === 0 && (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', margin: '20px 0' }}>No hay hábitos. Añade uno abajo.</p>
              )}
            </div>
          </div>

          {/* Add Habit Button */}
          <button 
            onClick={openAddModal}
            style={{ 
              width: '100%', padding: '15px', background: 'transparent', 
              border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '16px',
              color: 'var(--text-muted)', fontSize: '15px', fontWeight: 'bold',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              cursor: 'pointer'
            }}
          >
            <Plus size={18} /> Añadir habito
          </button>

          {/* PROTOCOLO DE CONTROL */}
          <div className="protocolo-btn-container" style={{ marginTop: '30px' }}>
            <div className="protocolo-btn-glow"></div>
            <button className="protocolo-btn" onClick={triggerPanicRoom}>
              <Zap size={18} strokeWidth={2.5} />
              ACTIVAR PROTOCOLO DE CONTROL
            </button>
          </div>
        </>
      ) : (
        /* STATS VIEW (Accessible via the ESTADÍSTICAS button) */
        <div className="stats-view animate-fade-in" style={{ padding: '10px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
            <button onClick={() => setActiveTab('tracker')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
              <ChevronLeft size={24} />
            </button>
            <h2 style={{ margin: '0 0 0 10px', fontSize: '20px', fontWeight: 'bold' }}>Estadísticas</h2>
          </div>

          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '4px', marginBottom: '25px' }}>
            {['Semana', 'Mes', 'Trimestre', 'Año'].map(tf => (
              <div 
                key={tf}
                onClick={() => setTimeFilter(tf)}
                style={{ 
                  flex: 1, textAlign: 'center', padding: '8px', 
                  background: timeFilter === tf ? 'var(--accent-neon)' : 'transparent', 
                  borderRadius: '16px', 
                  color: timeFilter === tf ? '#fff' : 'var(--text-muted)', 
                  fontSize: '13px', fontWeight: timeFilter === tf ? '600' : 'normal',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {tf}
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>CUMPLIMIENTO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '15px' }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.percentage}%</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                {timeFilter === 'Semana' ? 'esta semana' : 
                 timeFilter === 'Mes' ? 'este mes' : 
                 timeFilter === 'Trimestre' ? 'este trimestre' : 'este año'}
              </span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <div style={{ width: `${stats.percentage}%`, height: '100%', background: 'var(--accent-neon)', borderRadius: '2px' }}></div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>POR DIA</div>
            <div style={{ height: '140px', width: '100%', marginLeft: '-20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                  <defs>
                    <linearGradient id="colorStatsUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-neon)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--accent-neon)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="uv" stroke="var(--accent-neon)" strokeWidth={3} fillOpacity={1} fill="url(#colorStatsUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>POR HABITO</div>
            {stats.bestHabits.map((h, i) => {
              let color = '#22c55e'; // green
              if (h.pct < 50) color = '#ef4444'; // red
              else if (h.pct < 80) color = '#f59e0b'; // yellow

              return (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '13px', color: '#fff' }}>{h.name}</span>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{h.pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                    <div style={{ width: `${h.pct}%`, height: '100%', background: color, borderRadius: '2px' }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>LEYENDA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div>
                <span style={{ fontSize: '13px', color: '#fff' }}>Completado</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                <span style={{ fontSize: '13px', color: '#fff' }}>No completado</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sin registrar</span>
              </div>
            </div>
            <p style={{ marginTop: '15px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Un dia sin registrar no cuenta como fallo. Solo los dias marcados como completados o no completados se consideran.
            </p>
          </div>

        </div>
      )}

      {/* Input Modal */}
      <AnimatePresence>
        {modalState.isOpen && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.8)', zIndex: 1000, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' 
          }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel" 
              style={{ width: '100%', maxWidth: '400px', padding: '25px', borderRadius: '20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>
                  {modalState.type === 'add' ? 'Añadir nuevo hábito' : 'Editar hábito'}
                </h3>
                <button onClick={() => setModalState({ ...modalState, isOpen: false })} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <input 
                type="text" 
                value={modalInputValue}
                onChange={(e) => setModalInputValue(e.target.value)}
                placeholder="Ej. Leer 10 páginas..."
                style={{ 
                  width: '100%', padding: '15px', borderRadius: '12px', 
                  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', 
                  color: '#fff', fontSize: '16px', marginBottom: '20px', outline: 'none',
                  boxSizing: 'border-box'
                }}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleModalSubmit()}
              />

              {modalState.type === 'add' && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>Sugerencias:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Ducha fría', 'Meditar 10 min', 'Leer 10 páginas', 'Gimnasio', 'Salir a caminar'].map(sug => (
                      <span 
                        key={sug}
                        onClick={() => setModalInputValue(sug)}
                        style={{
                          padding: '6px 12px', borderRadius: '20px', fontSize: '13px',
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer', color: 'var(--text-muted)'
                        }}
                      >
                        {sug}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={handleModalSubmit}
                style={{ 
                  width: '100%', padding: '15px', borderRadius: '12px', 
                  background: 'var(--accent-neon)', border: 'none', 
                  color: '#000', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' 
                }}
              >
                Guardar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.8)', zIndex: 1000, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' 
          }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel" 
              style={{ width: '100%', maxWidth: '400px', padding: '25px', borderRadius: '20px', textAlign: 'center' }}
            >
              <Trash2 size={40} color="#ef4444" style={{ margin: '0 auto 15px' }} />
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>¿¿Eliminar hábito?</h3>
              <p style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                Esto archivará el hábito. Tus datos históricos se mantendrán.
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setConfirmModal({ isOpen: false, habitId: null })}
                  style={{ 
                    flex: 1, padding: '15px', borderRadius: '12px', 
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' 
                  }}
                >
                  Cancelar
                </button>
                <button 
                  onClick={confirmDelete}
                  style={{ 
                    flex: 1, padding: '15px', borderRadius: '12px', 
                    background: '#ef4444', border: 'none', 
                    color: '#fff', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' 
                  }}
                >
                  ¿Eliminar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Habits;
