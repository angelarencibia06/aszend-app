import os
import re

home_path = "../aszend_app/src/pages/Home.jsx"
with open(home_path, "r", encoding="utf-8") as f:
    home = f.read()

# Add import if missing
if "import { EnergyOrb }" not in home:
    home = home.replace("import { Lock, Shield } from 'lucide-react';", "import { Lock, Shield } from 'lucide-react';\nimport { EnergyOrb } from '../components/EnergyOrb';")

# Replace everything from <div className="sphere-wrapper"> to its closing </div>
# Since it contains nested divs, regex with DOTALL is risky if we don't bound it perfectly.
# The structure is:
# <div className="sphere-wrapper"> ... </div> (the one inside the carousel item)
pattern = r'<div className="sphere-wrapper">.*?<Lock size=\{24\} />.*?</div>\s*\)\}.*?</div>\s*</div>'
home = re.sub(pattern, '<div className="sphere-wrapper" style={{ pointerEvents: "none" }}><EnergyOrb rankIndex={i} size={110} locked={locked} animated={i === activeIndex} /></div>', home, flags=re.DOTALL)

with open(home_path, "w", encoding="utf-8") as f:
    f.write(home)
