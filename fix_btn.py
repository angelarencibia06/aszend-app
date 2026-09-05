import os

file_path = r'C:\Users\Ángel\.gemini\antigravity\scratch\aszend_app\src\pages\Onboarding.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

target = 'className="px-4 py-2 rounded-full font-bold text-[11px] tracking-[0.16em] uppercase"'
replacement = 'className="px-6 py-2.5 rounded-full font-bold text-[11px] tracking-[0.16em] uppercase whitespace-nowrap flex-shrink-0 text-center w-fit"'

code = code.replace(target, replacement)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)
