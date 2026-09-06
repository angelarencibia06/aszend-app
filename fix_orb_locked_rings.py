import re

with open('src/components/EnergyOrb.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the renderRings logic
old_logic = r'''    // Render rings based on rank
    const renderRings = \(\) => \{
      if \(locked\) return null; // No rings if locked
      
      const ringColor = c.core;
      const ringOpacity = 0.6;'''

new_logic = r'''    // Render rings based on rank
    const renderRings = () => {
      const ringColor = locked ? '#6b7280' : c.core;
      const ringOpacity = locked ? 0.4 : 0.6;'''

content = re.sub(old_logic, new_logic, content)

with open('src/components/EnergyOrb.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
