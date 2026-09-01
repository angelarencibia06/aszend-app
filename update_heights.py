import os

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace all h-full with min-h-full to allow scrolling
code = code.replace('className="flex flex-col h-full', 'className="flex flex-col min-h-full')

# Revert step 0
code = code.replace('className="flex flex-col min-h-full items-center justify-center relative overflow-hidden"',
                    'className="flex flex-col h-full items-center justify-center relative overflow-hidden"')

# Revert outer wrapper
code = code.replace('className="flex flex-col min-h-full relative" style={{ ...SF',
                    'className="flex flex-col h-full relative" style={{ ...SF')

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
