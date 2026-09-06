import re

with open('src/pages/Profile.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Import EnergyOrb
content = content.replace("import { useAppContext } from '../context/AppContext';", "import { useAppContext } from '../context/AppContext';\nimport { EnergyOrb } from '../components/EnergyOrb';")

# Replace img/Swords with EnergyOrb
target = r'<img src=\{`/ranks/rank\$\{activeRankDef\.level\}\.png`\} alt=\{activeRankDef\.name\} style=\{\{ width: 24, height: 24, objectFit: "contain" \}\} onError=\{\(e\) => \{ e\.target\.style\.display="none"; e\.target\.nextSibling\.style\.display="block"; \}\} \/><Swords size=\{22\} color=\{activeRankDef\.color1\} style=\{\{ opacity: 0\.7, display: "none" \}\} \/>'
replacement = r'<div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", transform: "scale(0.5)", transformOrigin: "center" }}><EnergyOrb size={56} rankIndex={activeRankDef.level - 1} animated={false} /></div>'

content = re.sub(target, replacement, content)

with open('src/pages/Profile.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
