import os

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

target1 = """            {answers[qIdx] !== undefined && (
              <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest"
                style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}>
                CONTINUAR
              </button>
            )}"""

target2 = """            {answers[qIdx] !== undefined && (
              <button onClick={next} className="w-full py-5 rounded-full text-base font-extrabold text-white uppercase tracking-widest transition-all active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.45), 0 1px 0 rgba(255,255,255,0.1) inset" }}>
                CONTINUAR
              </button>
            )}"""

code = code.replace(target1, '')
code = code.replace(target2, '')

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
