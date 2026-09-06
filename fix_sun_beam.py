import re

with open('src/components/EnergyOrb.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = r'<circle cx=\{center\} cy=\{center\} r=\{size \* 0\.3\} fill=\{`url\(#\$\{id\}_beam\)`\} opacity="0\.5" stroke="none" filter="url\(#glowFilter\)" \/>'
replacement = r'{!locked && <circle cx={center} cy={center} r={size * 0.3} fill={`url(#${id}_beam)`} opacity="0.5" stroke="none" filter="url(#glowFilter)" />}'

content = re.sub(target, replacement, content)

with open('src/components/EnergyOrb.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
