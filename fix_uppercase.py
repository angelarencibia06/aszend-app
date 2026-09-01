import os
import re

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# For ¿Quieres que Aszend te acompañe?
code = re.sub(
    r'<h2 className="([^"]*)uppercase([^"]*)"([^>]*)>¿Quieres que Aszend te acompañe\?</h2>',
    r'<h2 className="\1\2"\3>¿QUIERES QUE Aszend TE ACOMPAÑE?</h2>',
    code
)

# For EMPEZAR CON Aszend
code = re.sub(
    r'EMPEZAR CON Aszend',
    r'EMPEZAR CON <span className="normal-case">Aszend</span>',
    code
)

# Let's also check for Aszend PRO
code = re.sub(
    r'>Aszend Pro<',
    r'><span className="normal-case">Aszend</span> PRO<',
    code
)

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
