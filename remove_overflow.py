import os

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace('className="flex flex-col min-h-full px-8 pb-8 pt-6 relative overflow-hidden"', 'className="flex flex-col min-h-full px-8 pb-8 pt-6 relative"')
code = code.replace('className="flex flex-col min-h-full px-8 pb-8 pt-12 relative overflow-hidden"', 'className="flex flex-col min-h-full px-8 pb-8 pt-12 relative"')

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
