import os

path = "../aszend_app/src/pages/Onboarding.jsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace Step 4 (La Cruda Realidad)
old_step_4 = """      case 4:
        return (
          <div className="onboarding-content scrollable">
            <h1 className="onboarding-heading" style={{ fontSize: '28px', color: '#ef4444' }}>La Cruda Realidad</h1>
            <p className="onboarding-subtext">Tu cerebro está sufriendo cambios estructurales reales. Esto es lo que la ciencia dice sobre tu situación:</p>
            
            <div className="science-list">
              <div className="science-item">
                <div className="sci-icon" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}><Brain size={20} /></div>
                <div className="sci-text">
                  <h3>Hipofrontalidad</h3>
                  <p>Reducción física del flujo sanguíneo a tu Córtex Prefrontal. Esta es la parte de tu cerebro encargada de la fuerza de voluntad y la toma de decisiones. Por eso sientes que "pierdes el control" y actúas en automático.</p>
                </div>
              </div>
              <div className="science-item">
                <div className="sci-icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}><Activity size={20} /></div>
                <div className="sci-text">
                  <h3>Desensibilización de Receptores D2</h3>
                  <p>La pornografía satura tu cerebro con tanta dopamina artificial que este se defiende eliminando receptores (D2). Como resultado, la vida real, el trabajo, el estudio y el gimnasio te parecen aburridos y carentes de sentido.</p>
                </div>
              </div>
              <div className="science-item">
                <div className="sci-icon" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}><ShieldAlert size={20} /></div>
                <div className="sci-text">
                  <h3>Acumulación de DeltaFosB</h3>
                  <p>Una proteína que se acumula en el sistema de recompensa tras picos extremos de placer artificial, grabando físicamente el surco de la adicción en tu cerebro y haciéndote propenso a otras adicciones.</p>
                </div>
              </div>
            </div>

            <button className="onboarding-btn-primary" onClick={nextStep} style={{ marginTop: '24px' }}>
              Ver la Solución <ArrowRight size={18} />
            </button>
          </div>
        );"""

new_step_4 = """      case 4:
        return (
          <div className="onboarding-content center-all">
            <div className="hero-icon-container" style={{ margin: '0 auto 20px auto', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
              <Brain size={48} color="#ef4444" />
            </div>
            <h1 className="onboarding-heading" style={{ fontSize: '28px', color: '#ef4444' }}>La Cruda Realidad</h1>
            <p className="onboarding-subtext" style={{ marginBottom: '30px' }}>Tu cerebro ha sufrido cambios estructurales. La ciencia es clara:</p>
            
            <div className="science-list-v2">
              <motion.div className="sci-card-v2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3>Hipofrontalidad</h3>
                <p>Menos sangre en el lóbulo frontal. Tu fuerza de voluntad se apaga.</p>
              </motion.div>
              
              <motion.div className="sci-card-v2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3>Receptores D2 Rotos</h3>
                <p>Saturación de dopamina. La vida real te parece aburrida.</p>
              </motion.div>
              
              <motion.div className="sci-card-v2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3>Efecto DeltaFosB</h3>
                <p>La proteína que graba físicamente la adicción en tu cerebro.</p>
              </motion.div>
            </div>

            <button className="onboarding-btn-primary" onClick={nextStep} style={{ marginTop: 'auto', background: '#ef4444' }}>
              ¿Cómo lo arreglo?
            </button>
          </div>
        );"""

content = content.replace(old_step_4, new_step_4)

# Replace Step 5 (Protocolo Aszend)
old_step_5 = """      case 5:
        return (
          <div className="onboarding-content">
            <h1 className="onboarding-heading" style={{ fontSize: '28px', color: '#3b82f6' }}>Protocolo Aszend</h1>
            <p className="onboarding-subtext">La fuerza de voluntad no es suficiente. Necesitas un sistema estricto para forzar la neuroplasticidad inversa.</p>
            
            <div className="solution-box">
              <div className="sol-row">
                <Lock size={20} color="#3b82f6" />
                <span><strong>Bloqueador Nativo:</strong> Cero fricción. Tú decides qué bloquear, el sistema lo hace cumplir a nivel de Android.</span>
              </div>
              <div className="sol-row">
                <Activity size={20} color="#3b82f6" />
                <span><strong>Análisis de Riesgo:</strong> Algoritmo de prevención basado en tus check-ins diarios y factores de sueño/estrés.</span>
              </div>
              <div className="sol-row">
                <Zap size={20} color="#3b82f6" />
                <span><strong>Transmutación:</strong> Tracker estricto para redirigir tu dopamina hacia hábitos productivos reales.</span>
              </div>
            </div>

            <button className="onboarding-btn-primary" onClick={nextStep} style={{ marginTop: 'auto' }}>
              Comenzar Recuperación
            </button>
          </div>
        );"""

new_step_5 = """      case 5:
        return (
          <div className="onboarding-content center-all">
            <div className="hero-icon-container" style={{ margin: '0 auto 20px auto', background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <Target size={48} color="#3b82f6" />
            </div>
            <h1 className="onboarding-heading" style={{ fontSize: '28px', color: '#3b82f6' }}>El Protocolo</h1>
            <p className="onboarding-subtext" style={{ marginBottom: '30px' }}>La motivación falla. Un sistema estricto, no.</p>
            
            <div className="science-list-v2">
              <motion.div className="sci-card-v2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Lock size={24} color="#3b82f6" style={{ margin: '0 auto 8px auto' }} />
                <h3>Bloqueo Nativo</h3>
                <p>Cero fricción. Tú eliges qué, el sistema lo bloquea.</p>
              </motion.div>
              
              <motion.div className="sci-card-v2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Activity size={24} color="#3b82f6" style={{ margin: '0 auto 8px auto' }} />
                <h3>Análisis de Riesgo</h3>
                <p>Prevención de recaídas basada en tus propios datos diarios.</p>
              </motion.div>
              
              <motion.div className="sci-card-v2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Zap size={24} color="#3b82f6" style={{ margin: '0 auto 8px auto' }} />
                <h3>Transmutación</h3>
                <p>Forza tu dopamina hacia hábitos productivos reales.</p>
              </motion.div>
            </div>

            <button className="onboarding-btn-primary" onClick={nextStep} style={{ marginTop: 'auto' }}>
              Comenzar Recuperación
            </button>
          </div>
        );"""

content = content.replace(old_step_5, new_step_5)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
