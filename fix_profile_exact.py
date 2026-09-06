import os

with open('src/pages/Profile.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update RANGOS DE ASCENSIÓN icon
target_swords = '<Swords size={22} color={activeRankDef.color1} style={{ opacity: 0.7 }} />'
new_swords = '<img src={`/ranks/rank${activeRankDef.level}.png`} alt={activeRankDef.name} style={{ width: 24, height: 24, objectFit: "contain" }} onError={(e) => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} /><Swords size={22} color={activeRankDef.color1} style={{ opacity: 0.7, display: "none" }} />'
content = content.replace(target_swords, new_swords)

# 2. Update Insignias y Logros icon to gold
target_medal = '<Medal size={22} color={activeRankDef.color1} style={{ opacity: 0.7 }} />'
new_medal = '<Medal size={22} color="#FBBF24" style={{ opacity: 1 }} />'
content = content.replace(target_medal, new_medal)

# 3. Update Settings icon to gray
target_settings = '<Settings size={22} color={activeRankDef.color1} style={{ opacity: 0.7 }} />'
new_settings = '<Settings size={22} color="#9ca3af" style={{ opacity: 1 }} />'
content = content.replace(target_settings, new_settings)

# 4. In renderSubMenu() for 'ranks'
target_orb = '<div className="sphere-wrapper" style={{ position: "relative", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyItems: "center" }}>'
new_orb_wrapper = '<div className="sphere-wrapper" style={{ position: "relative", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>'
content = content.replace(target_orb, new_orb_wrapper)

target_orb_tag = '<EnergyOrb rankIndex={idx} size={80} locked={locked} animated={!locked} />'
new_orb_tag = '<img src={`/ranks/rank${rank.level}.png`} alt={rank.name} style={{ width: "40px", height: "40px", objectFit: "contain", filter: locked ? "grayscale(100%) opacity(0.3)" : "none" }} onError={(e) => { e.target.style.display="none"; e.target.nextSibling.style.display="block"; }} />\n                    <div style={{ display: "none", position: "absolute" }}><EnergyOrb rankIndex={idx} size={80} locked={locked} animated={!locked} /></div>'
content = content.replace(target_orb_tag, new_orb_tag)

with open('src/pages/Profile.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
