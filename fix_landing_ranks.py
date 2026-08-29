import os
import re

file_path = "../aszend_landing/src/App.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# The array looks like this:
#  const RANKS = [
#    { core: "#93c5fd", mid: "#2563eb", outer: "#1e3a8a", name: "VACÍO" },
#    ...
#  ];

new_ranks = """  const RANKS = [
    { core: "#94a3b8", mid: "#475569", outer: "#1e293b", name: "VACÍO" },
    { core: "#93c5fd", mid: "#2563eb", outer: "#1e3a8a", name: "PULSO" },
    { core: "#c4b5fd", mid: "#7c3aed", outer: "#4c1d95", name: "AURA" },
    { core: "#6ee7b7", mid: "#059669", outer: "#065f46", name: "NÚCLEO" },
    { core: "#fdba74", mid: "#ea580c", outer: "#9a3412", name: "ÉTER" },
    { core: "#fde68a", mid: "#d97706", outer: "#92400e", name: "ASCENSIÓN" },
  ];"""

content = re.sub(r'const RANKS = \[.*?\];', new_ranks, content, flags=re.DOTALL)

# In case the user sees the old "CHISPA" and "CONVERGENCIA" in the screenshots or other text in the landing page,
# let's make sure they are completely wiped. (I already replaced CHISPA with VACÍO earlier).
content = content.replace("CONVERGENCIA", "ÉTER")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
