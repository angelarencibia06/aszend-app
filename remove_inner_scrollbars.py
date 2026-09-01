import os

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace('className="flex-1 hide-scroll overflow-y-auto flex flex-col gap-4 pb-3"', 
                    'className="flex-1 flex flex-col gap-4 pb-3"')
code = code.replace('className="flex-1 hide-scroll overflow-y-auto flex flex-col gap-5 pb-3"', 
                    'className="flex-1 flex flex-col gap-5 pb-3"')

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
