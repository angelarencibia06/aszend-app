import re

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace('text-[22px]', 'text-3xl leading-tight')
code = code.replace('text-sm text-white/40', 'text-base text-white/50')
code = code.replace('py-4 rounded-2xl text-sm font-bold', 'py-5 rounded-full text-base font-extrabold')
code = code.replace('py-3.5 rounded-2xl text-sm font-semibold', 'py-4 rounded-full text-base font-bold')
code = code.replace('px-6 pb-6 pt-10', 'px-8 pb-8 pt-12')
code = code.replace('p-3.5', 'p-5')
code = code.replace('gap-2.5', 'gap-4')
code = code.replace('text-sm text-[#93C5FD]', 'text-base text-[#93C5FD]')

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
