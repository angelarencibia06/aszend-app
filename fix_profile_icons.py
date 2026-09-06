import re

with open('src/pages/Profile.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update RANGOS DE ASCENSIÓN icon
# Currently: <Swords size={22} color={activeRankDef.color1} style={{ opacity: 0.7 }} />
# Replace with dynamic image / fallback to EnergyOrb or just an img tag. Let's use an img tag pointing to public/ranks/rank{level}.png, fallback to swords.
old_swords = r'<Swords size=\{22\} color=\{activeRankDef\.color1\} style=\{\{ opacity: 0\.7 \}\} \/>'
new_swords = r'<img src={`/ranks/rank${activeRankDef.level}.png`} alt={activeRankDef.name} style={{ width: 24, height: 24, objectFit: "contain" }} onError={(e) => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} /><Swords size={22} color={activeRankDef.color1} style={{ opacity: 0.7, display: "none" }} />'
content = re.sub(old_swords, new_swords, content)

# 2. Update Insignias y Logros icon to gold
old_medal = r'<Medal size=\{22\} color=\{activeRankDef\.color1\} style=\{\{ opacity: 0\.7 \}\} \/>'
new_medal = r'<Medal size={22} color="#FBBF24" style={{ opacity: 1 }} />'
content = re.sub(old_medal, new_medal, content)

# 3. Update Settings icon to gray
old_settings = r'<Settings size=\{22\} color=\{activeRankDef\.color1\} style=\{\{ opacity: 0\.7 \}\} \/>'
new_settings = r'<Settings size={22} color="#9ca3af" style={{ opacity: 1 }} />'
content = re.sub(old_settings, new_settings, content)

# 4. In renderSubMenu() for 'ranks'
# "En el apartado de los iconos de los niveles, que aparezcan los nuestros propios, al entrar, quiero que aparezcan ordenados de menor a mayor nivel de dificultad"
# Currently in Profile.jsx, it renders RANKS.map() for the submenu. I need to make sure the ranks are ordered correctly and use the PNGs.
# Let's check how they are ordered. RANKS is already [1, 2, 3, 4, 5] (Pulso -> Ascensión).
# Let's just update the <div className="sphere-wrapper"> in Profile.jsx to use the img tag.
old_orb_in_ranks = r'<div className="sphere-wrapper" style=\{\{ position: "relative", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyItems: "center" \}\}>\s*<EnergyOrb rankIndex=\{idx\} size=\{80\} locked=\{locked\} animated=\{!locked\} \/>\s*<\/div>'
new_orb_in_ranks = r'''<div className="sphere-wrapper" style={{ position: "relative", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={`/ranks/rank${rank.level}.png`} alt={rank.name} style={{ width: "40px", height: "40px", objectFit: "contain", filter: locked ? "grayscale(100%) opacity(0.3)" : "none" }} onError={(e) => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} />
                    <div style={{ display: "none", position: "absolute" }}><EnergyOrb rankIndex={idx} size={80} locked={locked} animated={!locked} /></div>
                  </div>'''
content = re.sub(old_orb_in_ranks, new_orb_in_ranks, content)

with open('src/pages/Profile.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
