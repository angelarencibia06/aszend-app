import re

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

new_orb = """function EnergyOrb({ size = 120, intensity = 0.7, floating = false }) {
  const wrapStyle = {
    width: size, height: size, position: "relative",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
  };
  return (
    <div style={wrapStyle}>
      <img src="/logo.png" alt="Aszend Logo" style={{
        width: size * 0.9, height: size * 0.9, objectFit: 'contain', 
        mixBlendMode: 'screen',
        zIndex: 10
      }} />
    </div>
  );
}"""

# Use regex to find and replace the EnergyOrb function
code = re.sub(r'function EnergyOrb\(\{[\s\S]*?return \([\s\S]*?\);\n\}', new_orb, code)

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
