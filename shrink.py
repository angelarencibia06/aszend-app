import os

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Make sure all ob-d animated divs don't shrink and get cut off
code = code.replace('className="ob-d', 'className="shrink-0 ob-d')
code = code.replace("className={`ob-d", "className={`shrink-0 ob-d")

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
