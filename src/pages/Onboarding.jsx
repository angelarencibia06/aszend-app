import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, ChevronLeft, Zap, Shield, Brain, 
  Target, RefreshCw, Shuffle, CheckCircle, Swords, Bell
} from 'lucide-react';
import '../styles/App.css';

/* ─── Onboarding Data ────────────────────────────────────────────────────── */
const OB_QUESTIONS = [
  { q: "Con qué frecuencia consumes este tipo de contenido?", opts: ["Raramente", "A veces", "Con frecuencia", "Todos los días"] },
  { q: "Has intentado dejarlo anteriormente?", opts: ["Nunca lo he intentado", "Lo he intentado una vez", "Varias veces", "Muchas veces sin éxito"] },
  { q: "Sientes que pierdes el control en determinados momentos?", opts: ["Casi nunca", "A veces", "Con frecuencia", "Sí, constantemente"] },
  { q: "Sueles recurrir a él cuando estás aburrido, estresado o solo?", opts: ["No", "A veces", "Bastante a menudo", "Es mi principal escape"] },
  { q: "Ha interferido alguna vez con tus objetivos o rutinas?", opts: ["No", "En alguna ocasión", "Con bastante frecuencia", "Constantemente"] },
  { q: "Has sentido que lo consumes aunque realmente no quieras?", opts: ["Nunca", "Alguna vez", "Con frecuencia", "Sí, muy a menudo"] },
  { q: "¿Cuánto tiempo llevas con este hábito?", opts: ["Menos de 1 año", "1 a 3 años", "3 a 5 años", "Más de 5 años"] },
  { q: "¿Cómo te sientes justo después?", opts: ["Neutro", "Un poco culpable", "Bastante mal", "Muy mal, arrepentido"] },
  { q: "¿Afecta a tu concentración o energía durante el día?", opts: ["No noto diferencia", "Ligeramente", "Bastante", "Mucho, es notable"] },
  { q: "¿Qué te motivó a descargar esta app?", opts: ["Curiosidad", "Quiero mejorar", "Siento que tengo un problema", "Necesito ayuda urgente"] },
];

const OB_EDU = [
  { icon: RefreshCw, title: "NO ES SOLO\nUNA COSTUMBRE.", body: "Los comportamientos repetidos activan circuitos de recompensa que con el tiempo pueden volverse difíciles de controlar sin las herramientas adecuadas." },
  { icon: Brain, title: "LOS HÁBITOS REPETIDOS\nCREAN PATRONES.", body: "Cada vez que repites un comportamiento, el cerebro lo automatiza. El primer paso para cambiar es ser consciente de esos patrones." },
  { icon: Shuffle, title: "SIEMPRE PUEDES\nCAMBIAR EL CICLO.", body: "El cambio no es instantáneo. Con las estrategias correctas y constancia, puedes redirigir tu energía hacia lo que realmente quieres." },
  { icon: Target, title: "NO SE TRATA DE CULPA.\nSE TRATA DE CONTROL.", body: "Aszend no te juzga. Te da herramientas para entender tus patrones y tomar decisiones conscientes." },
  { icon: Zap, title: "Y AHORA TIENES UN\nSISTEMA PARA EMPEZAR.", body: "Has dado el primer paso. A partir de hoy, Aszend te acompañará en cada etapa de tu transformación." },
];

const OB_FEATURES = [
  { icon: Target, tag: "FOCO", desc: "Recupera tiempo y atención para aquello que realmente importa.", preview: "focus" },
  { icon: CheckCircle, tag: "HÁBITOS", desc: "Construye rutinas que sustituyan los antiguos patrones.", preview: "habits" },
  { icon: Shield, tag: "PROTECCIÓN", desc: "Bloquea los estímulos que has decidido evitar.", preview: "shield" },
  { icon: Brain, tag: "IA DE RIESGO", desc: "Identifica momentos en los que tus patrones indican mayor vulnerabilidad.", preview: "risk" },
  { icon: Zap, tag: "PROTOCOLO DE CONTROL", desc: "Cuando aparezca el impulso, sabrás exactamente qué hacer.", preview: "protocol" },
  { icon: Swords, tag: "ASCENSIÓN", desc: "Convierte tu progreso en un reto de transformación personal.", preview: "ranks" },
];

const OB_SYMPTOMS = [
  "Falta de concentración", "Pérdida de tiempo", "Falta de motivación",
  "Dificultad para mantener hábitos", "Sensación de pérdida de control",
  "Frustración conmigo mismo", "Aislamiento", "Ninguno de los anteriores",
];

const OB_GOALS = [
  "Recuperar el control", "Mejorar mi concentración", "Ser más disciplinado",
  "Mejorar mis hábitos", "Tener más confianza", "Mejorar mis relaciones", "Alcanzar mis objetivos",
];

const OB_DAYS7 = [
  { day: 1, title: "ROMPER EL AUTOMÁTICO", desc: "Toma conciencia de tus patrones actuales." },
  { day: 2, title: "RECUPERAR EL CONTROL", desc: "Aprende a gestionar el impulso en el momento." },
  { day: 3, title: "CONSTRUIR FOCO", desc: "Redirige tu energía hacia objetivos claros." },
  { day: 4, title: "FORTALECER HÁBITOS", desc: "Establece rutinas que sustituyan los patrones anteriores." },
  { day: 5, title: "REDUCIR DISTRACCIONES", desc: "Configura tu entorno para proteger tu progreso." },
  { day: 6, title: "CONSOLIDAR DISCIPLINA", desc: "Refuerza lo construido y prepárate para el largo plazo." },
  { day: 7, title: "TU NUEVA DIRECCIÓN", desc: "Evalúa tu primera semana y define el siguiente objetivo." },
];

/* ─── Energy Orb ─────────────────────────────────────────────────────────── */
function EnergyOrb({ size = 120, intensity = 0.7, floating = false }) {
  const wrapStyle = {
    width: size, height: size, position: "relative",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
  };
  return (
    <div style={wrapStyle}>
      <img src="/logo.png" alt="Aszend Logo" style={{
        width: size * 0.9, height: size * 0.9, objectFit: 'contain', 
        mixBlendMode: 'screen',
        zIndex: 10
      }} />
    </div>
  );
}

/* ─── Onboarding ─────────────────────────────────────────────────────────── */
function OnboardingScreen({ onDone, onLogin }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [obName, setObName] = useState("");
  const [obAge, setObAge] = useState("");
  const [obSymptoms, setObSymptoms] = useState([]);
  const [obGoals, setObGoals] = useState([]);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [analyzeStatus, setAnalyzeStatus] = useState("Analizando respuestas...");
  const [lastSel, setLastSel] = useState(-1);

  const SF = { fontFamily: "'Sora', sans-serif" };
  const RJ = { fontFamily: "'Rajdhani', sans-serif" };

  useEffect(() => {
    if (step !== 0) return;
    const t = setTimeout(() => setStep(1), 3000);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 14) return;
    setAnalyzeProgress(0);
    const statuses = ["Analizando respuestas...", "Identificando patrones...", "Analizando hábitos...", "Preparando tu perfil..."];
    let prog = 0;
    const id = setInterval(() => {
      prog = Math.min(prog + 1.2, 100);
      setAnalyzeProgress(Math.round(prog));
      setAnalyzeStatus(statuses[Math.min(Math.floor(prog / 25), 3)]);
      if (prog >= 100) { clearInterval(id); setTimeout(() => setStep(15), 600); }
    }, 30);
    return () => clearInterval(id);
  }, [step]);

  const riskScore = answers.reduce((s, a) => s + (a || 0), 0);
  const riskLevel = riskScore >= 21 ? "ALTO" : riskScore >= 11 ? "MEDIO" : "BAJO";
  const riskColor = riskLevel === "ALTO" ? "#EF4444" : riskLevel === "MEDIO" ? "#F59E0B" : "#10B981";
  const orbIntensity = step < 3 ? 0.45 : step < 15 ? 0.7 : 1.0;

  const isQStep = step >= 3 && step <= 12;
  const qIdx = step - 3;
  const isEduStep = step >= 16 && step <= 20;
  const eduIdx = step - 16;
  const isFeatStep = step >= 21 && step <= 26;
  const featIdx = step - 21;
  const showBack = step >= 2 && step !== 14;

  function next() { setStep((s) => Math.min(s + 1, 31)); }

  function answerQ(qi, ai) {
    setLastSel(ai);
    const u = [...answers]; u[qi] = ai; setAnswers(u);
    setTimeout(next, 400);
  }

  function toggleArr(arr, setFn, item) {
    setFn(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  }

  const previews = {
    focus: (
      <div className="w-full rounded-2xl p-4 border border-[#2563EB]/20" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(0,0,0,0.6) 100%)", boxShadow: "0 4px 24px rgba(37,99,235,0.1), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
        <p className="text-[9px] text-[#2563EB]/70 uppercase tracking-widest mb-3 font-semibold">Deep Work esta semana</p>
        <div className="flex items-end gap-1.5 h-12">
          {[55, 80, 40, 100, 65, 88, 50].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: h >= 88 ? "linear-gradient(180deg,#60A5FA,#2563EB)" : "rgba(37,99,235,0.45)" }} />
          ))}
        </div>
        <div className="flex justify-between mt-2">{["L","M","X","J","V","S","D"].map((d) => <span key={d} className="text-[8px] text-white/20">{d}</span>)}</div>
      </div>
    ),
    habits: (
      <div className="w-full rounded-2xl p-4 border border-white/[0.06]" style={{ background: "rgba(0,0,0,0.5)", boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        {[{ h: "Dormir 7 horas", done: true }, { h: "Entrenar", done: true }, { h: "Deep Work 4h", done: false }].map(({ h, done }) => (
          <div key={h} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: done ? "#2563EB" : "transparent", border: done ? "none" : "1px solid rgba(255,255,255,0.15)", boxShadow: done ? "0 0 10px rgba(37,99,235,0.5)" : "none" }}>
              {done && <Check size={10} className="text-white" strokeWidth={3} />}
            </div>
            <span className={`text-sm font-medium ${done ? "text-white" : "text-white/35"}`}>{h}</span>
            {done && <span className="ml-auto text-[9px] text-[#10B981] font-bold">✓</span>}
          </div>
        ))}
      </div>
    ),
    shield: (
      <div className="w-full rounded-2xl p-4 border border-[#10B981]/20 flex items-center gap-4" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(0,0,0,0.6) 100%)", boxShadow: "0 4px 24px rgba(16,185,129,0.08)" }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", boxShadow: "0 0 20px rgba(16,185,129,0.2)" }}>
          <Shield size={22} className="text-[#10B981]" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#10B981] tracking-wider mb-0.5">PROTECCIÓN ACTIVA</p>
          <p className="text-[10px] text-white/40">12 sitios bloqueados</p>
          <div className="flex gap-1 mt-1.5">{[1,2,3,4,5].map((i) => <div key={i} className="w-4 h-1 rounded-full bg-[#10B981]/40" />)}</div>
        </div>
      </div>
    ),
    risk: (
      <div className="w-full rounded-2xl p-4 border border-[#10B981]/15" style={{ background: "rgba(0,0,0,0.5)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-extrabold text-[#10B981]" style={{ ...RJ, lineHeight: 1, textShadow: "0 0 20px rgba(16,185,129,0.6)" }}>18%</div>
          <div>
            <p className="text-[11px] font-bold text-white mb-0.5">Riesgo estimado bajo</p>
            <p className="text-[9px] text-white/30">Basado en tus hábitos de hoy</p>
          </div>
        </div>
        <div className="mt-3 w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: "18%", background: "linear-gradient(90deg, #10B981, #34D399)", boxShadow: "0 0 8px rgba(16,185,129,0.6)" }} />
        </div>
      </div>
    ),
    protocol: (
      <div className="w-full rounded-2xl p-4 border border-[#2563EB]/15" style={{ background: "rgba(0,0,0,0.5)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        <p className="text-[9px] text-white/25 mb-2 tracking-wider">Protocolo activo · Nivel 2</p>
        <div className="text-3xl font-bold text-white mb-3" style={{ ...RJ, textShadow: "0 0 20px rgba(255,255,255,0.15)" }}>09:42</div>
        <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full rounded-full ob-shimmer-bar" style={{ width: "33%" }} />
        </div>
        <p className="text-[9px] text-white/25 mt-2">Respira. Aguanta 10 minutos.</p>
      </div>
    ),
    ranks: (
      <div className="w-full rounded-2xl p-4 border border-[#2563EB]/20 flex items-center gap-4" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(0,0,0,0.6) 100%)", boxShadow: "0 4px 24px rgba(37,99,235,0.1)" }}>
        <div className="text-3xl" style={{ filter: "drop-shadow(0 0 12px rgba(37,99,235,0.7))" }}>
          <Swords size={32} className="text-[#3B82F6]" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-widest mb-0.5">Guerrero</p>
          <p className="text-[10px] text-white/40">23 días de racha activa</p>
          <div className="flex gap-0.5 mt-1.5">{[1,2,3,4,5,6,7].map((i) => <div key={i} className="w-3 h-1 rounded-full" style={{ background: i <= 5 ? "#2563EB" : "rgba(255,255,255,0.1)" }} />)}</div>
        </div>
      </div>
    ),
  };

  function renderContent() {

    /* 0 — SPLASH */
    if (step === 0) return (
      <div className="flex flex-col h-full items-center justify-center relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(37,99,235,0.22) 0%, rgba(9,9,11,0.98) 65%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        {[
          { x: "22%", delay: "0s", dur: "3.2s" }, { x: "70%", delay: "0.6s", dur: "4s" },
          { x: "40%", delay: "1.1s", dur: "3.6s" }, { x: "80%", delay: "0.3s", dur: "2.8s" },
          { x: "15%", delay: "1.8s", dur: "3.9s" }, { x: "60%", delay: "0.9s", dur: "3.3s" },
        ].map((p, i) => (
          <div key={i} style={{ position: "absolute", bottom: "35%", left: p.x, width: 3, height: 3, borderRadius: "50%", background: "rgba(96,165,250,0.7)", animation: `ob-particle ${p.dur} ease-out ${p.delay} infinite` }} />
        ))}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: "linear-gradient(transparent, rgba(9,9,11,0.95))", pointerEvents: "none" }} />
        <EnergyOrb size={180} intensity={1} floating />
        <div className="text-center mt-10 relative z-10">
          <h1 style={{ ...SF, animation: "ob-wordmark 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both", fontSize: 38, fontWeight: 800, letterSpacing: "0.22em", color: "#fff" }}>Aszend</h1>
          <p style={{ animation: "ob-slide-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.9s both", fontSize: 11, letterSpacing: "0.3em", color: "#2563EB", fontWeight: 600, textTransform: "uppercase", marginTop: 10 }}>
            TRANSMUTA TU ENERGÍA.
          </p>
        </div>
      </div>
    );

    /* 1 — WELCOME */
    if (step === 1) return (
      <div className="flex flex-col min-h-full px-8 pb-8 pt-12 relative">
        <div style={{ position: "absolute", top: 0, left: "30%", right: "30%", height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)" }} />
        <div className="flex justify-center mb-7 ob-d0">
          <EnergyOrb size={90} intensity={0.55} floating />
        </div>
        <div className="flex-1 ob-d1">
          <h1 className="text-3xl leading-tight font-extrabold text-white leading-tight mb-5 uppercase" style={SF}>
            Empecemos por averiguar si tienes un problema.
          </h1>
          <p className="text-base text-white/50 leading-relaxed mb-5">
            Responde con sinceridad. No estamos aquí para juzgarte, sino para ayudarte a entender tus hábitos.
          </p>
          <div className="flex items-start gap-4 p-5 rounded-xl" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}>
            <Zap size={14} className="text-[#2563EB] mt-0.5 flex-shrink-0" />
            <p className="text-base text-[#93C5FD] font-medium leading-relaxed">
              Comencemos evaluando tu relación con la pornografía.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6 ob-d2">
          <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest transition-all active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.45), 0 1px 0 rgba(255,255,255,0.1) inset" }}>
            INICIAR CUESTIONARIO
          </button>
          <button onClick={onLogin} className="w-full py-4 rounded-full text-base font-bold text-white/50 uppercase tracking-widest transition-all border border-white/[0.08] active:bg-white/[0.04]"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            YA TENGO UNA CUENTA
          </button>
          <p className="text-[10px] text-white/18 text-center leading-relaxed">Al continuar aceptas nuestros Términos y Condiciones y Política de Privacidad.</p>
        </div>
      </div>
    );

    /* 2 — START CHALLENGE */
    if (step === 2) return (
      <div className="flex flex-col min-h-full px-8 pb-8 pt-6 relative">
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(37,99,235,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <div className="shrink-0 ob-d0"><EnergyOrb size={110} intensity={0.5} floating /></div>
          <div className="shrink-0 ob-d1 w-full">
            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
              <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)" }} />
              <p className="text-7xl font-extrabold text-white mb-3" style={{ ...RJ, letterSpacing: "0.04em", textShadow: "0 0 40px rgba(255,255,255,0.1)" }}>0 DÍAS</p>
              <p className="text-base text-white/50 leading-relaxed">Hoy vas a tomar una decisión que podría cambiar la forma en la que vives.</p>
            </div>
          </div>
          <p className="shrink-0 ob-d2 text-[11px] text-[#2563EB] font-bold tracking-[0.2em] uppercase">Tu transformación empieza aquí.</p>
        </div>
        <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest ob-d3"
          style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.5), 0 1px 0 rgba(255,255,255,0.1) inset" }}>
          COMENZAR
        </button>
      </div>
    );

    /* 3-12 — QUESTIONS */
    if (isQStep) {
      const q = OB_QUESTIONS[qIdx];
      return (
        <div className="flex flex-col min-h-full px-5 pb-6 pt-2 gap-4">
          <div className="flex-1 flex flex-col justify-center gap-5">
            <div className="shrink-0 ob-d0">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg mb-4" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" style={{ boxShadow: "0 0 6px #2563EB" }} />
                <span className="text-[9px] text-[#2563EB] font-bold tracking-widest uppercase">Pregunta {qIdx + 1} de {OB_QUESTIONS.length}</span>
              </div>
              <h2 className="text-[19px] font-bold text-white leading-snug" style={SF}>{q.q}</h2>
            </div>
            <div className="flex flex-col gap-4">
              {q.opts.map((opt, i) => {
                const sel = answers[qIdx] === i;
                return (
                  <button key={i} onClick={() => answerQ(qIdx, i)}
                    className={`shrink-0 ob-d${i + 1} w-full px-4 py-3.5 rounded-xl text-base font-semibold text-left transition-all`}
                    style={{
                      background: sel ? "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(29,78,216,0.15))" : "rgba(255,255,255,0.03)",
                      border: sel ? "1px solid rgba(37,99,235,0.55)" : "1px solid rgba(255,255,255,0.07)",
                      boxShadow: sel ? "0 0 0 1px rgba(37,99,235,0.3), 0 4px 20px rgba(37,99,235,0.2)" : "none",
                      color: sel ? "#fff" : "rgba(255,255,255,0.55)",
                      transform: sel ? "scale(1.01)" : "scale(1)",
                    }}>
                    <span className="mr-2.5 font-mono text-[11px]" style={{ color: sel ? "rgba(147,197,253,0.8)" : "rgba(255,255,255,0.2)" }}>{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {sel && <Check size={13} className="inline ml-auto text-[#60A5FA]" strokeWidth={2.5} style={{ marginLeft: "auto", float: "right", marginTop: 2 }} />}
                  </button>
                );
              })}
            </div>
          </div>
          {answers[qIdx] !== undefined && (
            <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest"
              style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}>
              CONTINUAR
            </button>
          )}
        </div>
      );
    }

    /* 13 — KNOW YOU */
    if (step === 13) return (
      <div className="flex flex-col min-h-full px-5 pb-8 pt-4">
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="shrink-0 ob-d0">
            <p className="text-[10px] tracking-[0.22em] text-[#2563EB] font-bold uppercase mb-2">Casi listo</p>
            <h2 className="text-2xl font-extrabold text-white uppercase leading-tight" style={SF}>Ahora queremos conocerte.</h2>
          </div>
          <div className="shrink-0 ob-d1">
            <label className="text-[10px] text-white/35 font-bold uppercase tracking-widest mb-2.5 block">¿Cómo te llamas?</label>
            <input value={obName} onChange={(e) => setObName(e.target.value)} placeholder="Tu nombre"
              className="w-full px-4 py-4 text-white text-base placeholder-white/20 outline-none transition-all rounded-xl"
              style={{ ...SF, background: "rgba(255,255,255,0.04)", border: `1px solid ${obName ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)"}`, boxShadow: obName ? "0 0 0 1px rgba(37,99,235,0.2), 0 4px 16px rgba(37,99,235,0.1)" : "none" }} />
          </div>
          <div className="shrink-0 ob-d2">
            <label className="text-[10px] text-white/35 font-bold uppercase tracking-widest mb-2.5 block">Tu rango de edad</label>
            <div className="grid grid-cols-3 gap-2">
              {["14-17", "18-21", "22-25", "26-30", "30+"].map((a) => (
                <button key={a} onClick={() => setObAge(a)} className="py-3 rounded-xl text-base font-bold transition-all"
                  style={{ background: obAge === a ? "linear-gradient(135deg,rgba(37,99,235,0.3),rgba(29,78,216,0.2))" : "rgba(255,255,255,0.04)", border: obAge === a ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.08)", color: obAge === a ? "#fff" : "rgba(255,255,255,0.45)", boxShadow: obAge === a ? "0 0 16px rgba(37,99,235,0.25)" : "none" }}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={next} disabled={!obName.trim() || !obAge}
          className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest transition-all ob-d3"
          style={{ background: (!obName.trim() || !obAge) ? "rgba(37,99,235,0.2)" : "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: (!obName.trim() || !obAge) ? "none" : "0 4px 20px rgba(37,99,235,0.45)", color: (!obName.trim() || !obAge) ? "rgba(255,255,255,0.3)" : "#fff" }}>
          CONTINUAR
        </button>
      </div>
    );

    /* 14 — ANALYZING */
    if (step === 14) return (
      <div className="flex flex-col min-h-full items-center justify-center px-8 gap-8 text-center relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(37,99,235,0.14) 0%, transparent 65%)" }}>
        <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.18)", animation: "ob-ring-expand 2.8s ease-out infinite" }} />
        <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.14)", animation: "ob-ring-expand 2.8s ease-out 0.9s infinite" }} />
        <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.1)", animation: "ob-ring-expand 2.8s ease-out 1.8s infinite" }} />
        <div style={{ position: "absolute", left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)", animation: "ob-scan 2s ease-in-out infinite" }} />
        <EnergyOrb size={140} intensity={orbIntensity} floating />
        <div>
          <p className="text-[10px] tracking-[0.25em] text-[#2563EB] font-bold uppercase mb-4" style={{ animation: "ob-glow-pulse 1.5s ease-in-out infinite" }}>{analyzeStatus}</p>
          <p className="text-7xl font-extrabold text-white mb-4" style={{ ...RJ, textShadow: "0 0 30px rgba(37,99,235,0.4)" }}>{analyzeProgress}%</p>
          <div className="w-52 mx-auto h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full ob-shimmer-bar transition-all" style={{ width: `${analyzeProgress}%` }} />
          </div>
        </div>
      </div>
    );

    /* 15 — RISK RESULT */
    if (step === 15) return (
      <div className="flex flex-col min-h-full px-5 pb-6 pt-2">
        <div className="flex-1 hide-scroll overflow-y-auto flex flex-col gap-4 pb-3">
          <div className="flex flex-col items-center gap-4 py-4 ob-d0">
            <EnergyOrb size={88} intensity={orbIntensity} />
            <div className="px-4 py-2 rounded-full font-bold text-[11px] tracking-[0.16em] uppercase"
              style={{ color: riskColor, background: `${riskColor}12`, border: `1px solid ${riskColor}40`, boxShadow: `0 0 20px ${riskColor}25`, animation: "ob-glow-pulse 2s ease-in-out infinite" }}>
              NIVEL DE RIESGO: {riskLevel}
            </div>
          </div>
          <div className="shrink-0 ob-d1 rounded-2xl p-4 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${riskColor}50, transparent)` }} />
            <h3 className="text-base font-bold text-white mb-2.5 leading-snug uppercase" style={SF}>Tu relación con este hábito presenta señales de riesgo.</h3>
            <p className="text-sm text-white/40 leading-relaxed">Tus respuestas muestran patrones que podrían estar afectando a tu control, tus hábitos y tus objetivos. Esto no es un diagnóstico, es información para ayudarte.</p>
          </div>
          <div className="shrink-0 ob-d2 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-3">¿Cuáles de estos aspectos reconoces en ti?</p>
            <div className="flex flex-col gap-2">
              {OB_SYMPTOMS.map((sym, si) => {
                const sel = obSymptoms.includes(sym);
                return (
                  <button key={sym} onClick={() => toggleArr(obSymptoms, setObSymptoms, sym)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ob-d${Math.min(si, 7)}`}
                    style={{ background: sel ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.025)", border: sel ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(255,255,255,0.05)", boxShadow: sel ? "0 0 12px rgba(37,99,235,0.15)" : "none" }}>
                    <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: sel ? "#2563EB" : "transparent", border: sel ? "none" : "1px solid rgba(255,255,255,0.18)", boxShadow: sel ? "0 0 8px rgba(37,99,235,0.5)" : "none" }}>
                      {sel && <Check size={9} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-sm font-medium" style={{ color: sel ? "#fff" : "rgba(255,255,255,0.5)" }}>{sym}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest"
          style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.5)" }}>
          REINICIAR MI CEREBRO
        </button>
      </div>
    );

    /* 16-20 — EDUCATION */
    if (isEduStep) {
      const slide = OB_EDU[eduIdx];
      const IconComponent = slide.icon;
      return (
        <div className="flex flex-col min-h-full px-8 pb-8 pt-6 relative"
          style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(37,99,235,0.08) 0%, transparent 60%)" }}>
          <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)" }} />
          <div className="flex-1 flex flex-col items-center justify-center gap-7 text-center">
            <div className="shrink-0 ob-d0 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", boxShadow: "0 0 30px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
              <IconComponent size={36} className="text-[#3B82F6]" />
            </div>
            <div className="shrink-0 ob-d1">
              <h2 className="text-[20px] font-extrabold text-white leading-tight mb-4 uppercase whitespace-pre-line" style={SF}>{slide.title}</h2>
              <p className="text-base text-white/38 leading-relaxed">{slide.body}</p>
            </div>
          </div>
          <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest ob-d2"
            style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}>
            {eduIdx < OB_EDU.length - 1 ? "SIGUIENTE" : "CONTINUAR"}
          </button>
        </div>
      );
    }

    /* 21-26 — FEATURES */
    if (isFeatStep) {
      const feat = OB_FEATURES[featIdx];
      const IconComp = feat.icon;
      return (
        <div className="flex flex-col min-h-full px-8 pb-8 pt-6">
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="text-center ob-d0">
              <p className="text-[9px] tracking-[0.22em] font-bold uppercase mb-5" style={{ color: "#2563EB" }}>AHORA CONSTRUYAMOS TU NUEVA REALIDAD.</p>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", boxShadow: "0 0 28px rgba(37,99,235,0.2)" }}>
                <IconComp size={30} className="text-[#3B82F6]" />
              </div>
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{feat.tag}</p>
              <h2 className="text-[16px] font-bold text-white leading-snug" style={SF}>{feat.desc}</h2>
            </div>
            <div className="shrink-0 ob-d1">{previews[feat.preview]}</div>
          </div>
          <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest ob-d2"
            style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}>
            {featIdx < OB_FEATURES.length - 1 ? "SIGUIENTE" : "CONTINUAR"}
          </button>
        </div>
      );
    }

    /* 27 — GOALS */
    if (step === 27) return (
      <div className="flex flex-col min-h-full px-5 pb-8 pt-4">
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="shrink-0 ob-d0">
            <p className="text-[10px] tracking-[0.22em] text-[#2563EB] font-bold uppercase mb-2">Tu motivación</p>
            <h2 className="text-2xl font-extrabold text-white uppercase leading-tight" style={SF}>¿Qué quieres conseguir?</h2>
          </div>
          <div className="flex flex-col gap-2">
            {OB_GOALS.map((g, gi) => {
              const sel = obGoals.includes(g);
              return (
                <button key={g} onClick={() => toggleArr(obGoals, setObGoals, g)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all ob-d${Math.min(gi + 1, 7)}`}
                  style={{ background: sel ? "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(29,78,216,0.08))" : "rgba(255,255,255,0.025)", border: sel ? "1px solid rgba(37,99,235,0.35)" : "1px solid rgba(255,255,255,0.06)", boxShadow: sel ? "0 0 16px rgba(37,99,235,0.18)" : "none" }}>
                  <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all"
                    style={{ background: sel ? "#2563EB" : "transparent", border: sel ? "none" : "1px solid rgba(255,255,255,0.18)", boxShadow: sel ? "0 0 8px rgba(37,99,235,0.5)" : "none" }}>
                    {sel && <Check size={9} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-base font-medium" style={{ color: sel ? "#fff" : "rgba(255,255,255,0.5)" }}>{g}</span>
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={next} disabled={obGoals.length === 0}
          className="w-full py-5 rounded-full text-base font-extrabold uppercase tracking-widest transition-all"
          style={{ background: obGoals.length === 0 ? "rgba(37,99,235,0.15)" : "linear-gradient(135deg,#2563EB,#1D4ED8)", color: obGoals.length === 0 ? "rgba(255,255,255,0.25)" : "#fff", boxShadow: obGoals.length === 0 ? "none" : "0 4px 20px rgba(37,99,235,0.45)" }}>
          CONTINUAR
        </button>
      </div>
    );

    /* 28 — NOTIFICATIONS */
    if (step === 28) return (
      <div className="flex flex-col min-h-full px-8 pb-8 pt-6">
        <div className="flex-1 flex flex-col items-center justify-center gap-7 text-center">
          <div className="relative ob-d0">
            <div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.35)", animation: "ob-ping 2s ease-out infinite" }} />
            <div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.2)", animation: "ob-ping 2s ease-out 0.7s infinite" }} />
            <div className="rounded-2xl flex items-center justify-center" style={{ width: 84, height: 84, background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", boxShadow: "0 0 32px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
              <Bell size={36} className="text-[#2563EB]" style={{ filter: "drop-shadow(0 0 10px rgba(37,99,235,0.7))" }} />
            </div>
          </div>
          <div className="shrink-0 ob-d1">
            <h2 className="text-[20px] font-extrabold text-white mb-3  leading-tight" style={SF}>¿QUIERES QUE Aszend TE ACOMPAÑE?</h2>
            <p className="text-base text-white/38 leading-relaxed">Podemos enviarte recordatorios, consejos y avisos importantes para ayudarte a mantener el rumbo.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 ob-d2">
          <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest"
            style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.5)" }}>
            ACTIVAR NOTIFICACIONES
          </button>
          <button onClick={next} className="text-base text-white/28 text-center py-2.5 active:opacity-70 transition-opacity">Ahora no</button>
        </div>
      </div>
    );

    /* 29 — SUMMARY */
    if (step === 29) return (
      <div className="flex flex-col min-h-full px-5 pb-8 pt-2">
        <div className="flex-1 hide-scroll overflow-y-auto flex flex-col gap-5 pb-3">
          <div className="flex flex-col items-center gap-3 pt-3 ob-d0">
            <EnergyOrb size={76} intensity={1} floating />
            <h2 className="text-[19px] font-extrabold text-white uppercase leading-tight text-center" style={SF}>Este es tu punto de partida.</h2>
            <p className="text-[11px] text-white/28">Hoy empieza tu transformación.</p>
          </div>
          <div className="shrink-0 ob-d1 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            {[
              { label: "Nombre", value: obName || "No indicado", color: "" },
              { label: "Edad", value: obAge || "No indicado", color: "" },
              { label: "Nivel de riesgo", value: riskLevel, color: riskColor },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] last:border-0">
                <span className="text-sm text-white/32">{row.label}</span>
                <span className="text-sm font-bold" style={{ color: row.color || "#FAFAFA", textShadow: row.color ? `0 0 12px ${row.color}60` : "none" }}>{row.value}</span>
              </div>
            ))}
          </div>
          {obSymptoms.length > 0 && (
            <div className="shrink-0 ob-d2 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-[9px] text-white/28 uppercase tracking-widest mb-2.5">Aspectos identificados</p>
              <div className="flex flex-wrap gap-1.5">{obSymptoms.map((s) => <span key={s} className="text-[10px] px-2.5 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.07)" }}>{s}</span>)}</div>
            </div>
          )}
          {obGoals.length > 0 && (
            <div className="shrink-0 ob-d3 rounded-2xl p-4" style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.15)" }}>
              <p className="text-[9px] text-[#2563EB]/60 uppercase tracking-widest mb-2.5">Tus objetivos</p>
              <div className="flex flex-wrap gap-1.5">{obGoals.map((g) => <span key={g} className="text-[10px] px-2.5 py-1 rounded-lg" style={{ background: "rgba(37,99,235,0.12)", color: "#93C5FD", border: "1px solid rgba(37,99,235,0.25)" }}>{g}</span>)}</div>
            </div>
          )}
          <div className="shrink-0 ob-d4 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[9px] text-white/28 uppercase tracking-widest mb-2.5">Hábitos iniciales</p>
            {["Dormir 7 horas", "Entrenar", "Deep Work 4h"].map((h) => (
              <div key={h} className="flex items-center gap-4 py-2">
                <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", boxShadow: "0 0 8px rgba(37,99,235,0.2)" }}>
                  <Check size={8} className="text-[#60A5FA]" strokeWidth={3} />
                </div>
                <span className="text-sm text-white/50">{h}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest"
          style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.5)" }}>
          COMENZAR MI ASCENSIÓN
        </button>
      </div>
    );

    /* 30 — 7-DAY ROADMAP */
    if (step === 30) return (
      <div className="flex flex-col min-h-full px-5 pb-8 pt-4">
        <div className="flex-1 hide-scroll overflow-y-auto flex flex-col gap-4 pb-3">
          <div className="shrink-0 ob-d0">
            <p className="text-[10px] tracking-[0.22em] text-[#2563EB] font-bold uppercase mb-1">Primer reto</p>
            <h2 className="text-2xl font-extrabold text-white uppercase leading-tight" style={SF}>Tus primeros 7 días</h2>
            <p className="text-[11px] text-white/30 mt-1.5">Un punto de partida, no el final del camino.</p>
          </div>
          <div className="flex flex-col mt-1">
            {OB_DAYS7.map((d, i) => (
              <div key={d.day} className={`flex gap-5 ob-d${Math.min(i, 7)}`}>
                <div className="flex flex-col items-center" style={{ width: 38 }}>
                  <div className="relative">
                    {i === 0 && <div style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.35)", animation: "ob-ring-expand 2.4s ease-out infinite" }} />}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: i === 0 ? "linear-gradient(135deg,#3B82F6,#1D4ED8)" : "rgba(255,255,255,0.04)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)", color: i === 0 ? "#fff" : "rgba(255,255,255,0.25)", boxShadow: i === 0 ? "0 0 18px rgba(37,99,235,0.5)" : "none" }}>
                      {d.day}
                    </div>
                  </div>
                  {i < OB_DAYS7.length - 1 && (
                    <div className="w-px my-1.5" style={{ height: 28, background: i === 0 ? "linear-gradient(180deg, rgba(37,99,235,0.6), rgba(37,99,235,0.1))" : "rgba(255,255,255,0.05)" }} />
                  )}
                </div>
                <div className="flex-1 pb-4 pt-1">
                  <p className="text-[11px] font-bold tracking-wide uppercase" style={{ color: i === 0 ? "#60A5FA" : "rgba(255,255,255,0.28)" }}>{d.title}</p>
                  <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.18)" }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest"
          style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}>
          CONTINUAR
        </button>
      </div>
    );

    /* 31 — PRICING */
    if (step === 31) return (
      <div className="flex flex-col min-h-full px-5 pb-6 pt-4">
        <div className="flex-1 hide-scroll overflow-y-auto flex flex-col gap-4 pb-3">
          <div className="flex flex-col items-center gap-3 pt-2 ob-d0">
            <EnergyOrb size={80} intensity={1} floating />
            <h2 className="text-[20px] font-extrabold text-white uppercase text-center leading-tight" style={SF}>Tu ascensión comienza ahora.</h2>
          </div>
          <div className="shrink-0 ob-d1 rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, rgba(37,99,235,0.08) 0%, rgba(0,0,0,0.6) 100%)", animation: "ob-border-glow 3s ease-in-out infinite" }}>
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.8), transparent)" }} />
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[9px] tracking-[0.22em] text-[#2563EB] font-bold uppercase mb-1">Plan Premium</p>
                <h3 className="text-xl font-extrabold text-white tracking-wide"><span className="normal-case">Aszend</span> PRO</h3>
              </div>
              <div className="text-right">
                <p className="text-4xl font-extrabold leading-none" style={{ ...RJ, color: "#fff", textShadow: "0 0 20px rgba(255,255,255,0.1)" }}>
                  10<span className="text-2xl text-[#60A5FA]">€</span>
                </p>
                <p className="text-[10px] text-white/28 mt-0.5">por mes</p>
              </div>
            </div>
            <div className="w-full h-px mb-5" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="flex flex-col gap-3">
              {["IA de análisis de riesgo", "Tracker de hábitos", "Bloqueador de sitios", "Protocolo de control", "Centro de mando", "Rangos de Ascensión", "Estadísticas avanzadas"].map((f, fi) => (
                <div key={f} className={`flex items-center gap-3 ob-d${Math.min(fi + 1, 7)}`}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", boxShadow: "0 0 8px rgba(37,99,235,0.2)" }}>
                    <Check size={10} className="text-[#60A5FA]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-white/55">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 ob-d2">
          <button onClick={() => onDone(obName)} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest"
            style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow: "0 6px 28px rgba(37,99,235,0.6), 0 1px 0 rgba(255,255,255,0.1) inset" }}>
            EMPEZAR CON <span className="normal-case">Aszend</span>
          </button>
          <button onClick={onLogin} className="text-sm text-white/28 text-center py-2.5 active:opacity-70 transition-opacity">Ya tengo una cuenta</button>
        </div>
      </div>
    );

    return null;
  }

  return (
    <div className="flex flex-col h-full relative" style={{ ...SF, background: "#09090B" }}>
      {step > 0 && (
        <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)", zIndex: 10, pointerEvents: "none" }} />
      )}
      {showBack && (
        <div className="flex items-center gap-3 px-5 pt-4 pb-2 flex-shrink-0 relative z-10">
          <button onClick={() => setStep((s) => Math.max(s - 1, 1))}
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-95"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
            <ChevronLeft size={17} className="text-white/70" />
          </button>
          {isQStep ? (
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[9px] text-white/28 font-semibold tracking-widest">PREGUNTA {qIdx + 1} / {OB_QUESTIONS.length}</span>
                <span className="text-[9px] text-[#2563EB] font-bold">{Math.round((qIdx / OB_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full ob-shimmer-bar transition-all duration-500" style={{ width: `${(qIdx / OB_QUESTIONS.length) * 100}%` }} />
              </div>
            </div>
          ) : isEduStep ? (
            <div className="flex flex-1 justify-center gap-1.5">
              {OB_EDU.map((_, i) => <div key={i} className="rounded-full transition-all duration-300" style={{ width: i === eduIdx ? 20 : 5, height: 5, background: i === eduIdx ? "#2563EB" : "rgba(255,255,255,0.1)", boxShadow: i === eduIdx ? "0 0 8px rgba(37,99,235,0.6)" : "none" }} />)}
            </div>
          ) : isFeatStep ? (
            <div className="flex flex-1 justify-center gap-1.5">
              {OB_FEATURES.map((_, i) => <div key={i} className="rounded-full transition-all duration-300" style={{ width: i === featIdx ? 20 : 5, height: 5, background: i === featIdx ? "#2563EB" : "rgba(255,255,255,0.1)", boxShadow: i === featIdx ? "0 0 8px rgba(37,99,235,0.6)" : "none" }} />)}
            </div>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      )}
      <div key={step} className="ob-enter flex-1 hide-scroll overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  return <OnboardingScreen onDone={() => navigate('/home')} onLogin={() => navigate('/auth')} />;
}
