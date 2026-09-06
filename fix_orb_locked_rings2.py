import re

with open('src/components/EnergyOrb.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('if (locked) return null; // No rings if locked', '')
content = content.replace('const ringColor = c.core;', 'const ringColor = locked ? \'#6b7280\' : c.core;')
content = content.replace('const ringOpacity = 0.6;', 'const ringOpacity = locked ? 0.4 : 0.6;')

with open('src/components/EnergyOrb.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
