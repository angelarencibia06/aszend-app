import os
import re

app_files = [
    "../aszend_app/src/pages/Home.jsx",
    "../aszend_app/src/pages/Profile.jsx",
    "../aszend_app/src/components/MilestoneOverlay.jsx"
]

landing_file = "../aszend_landing/src/App.tsx"

new_ranks_app = """const RANKS = [
  { id: 1, name: 'PULSO', number: '01', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', color1: '#fcd34d', color2: '#d97706', shadow: 'rgba(252, 211, 77, 0.5)', req: 365, level: 5 },
];"""

new_ranks_landing = """  const RANKS = [
    { core: "#93c5fd", mid: "#2563eb", outer: "#1e3a8a", name: "PULSO", req: 0, level: 1 },
    { core: "#c4b5fd", mid: "#7c3aed", outer: "#4c1d95", name: "AURA", req: 7, level: 2 },
    { core: "#6ee7b7", mid: "#059669", outer: "#065f46", name: "NÚCLEO", req: 30, level: 3 },
    { core: "#fdba74", mid: "#ea580c", outer: "#9a3412", name: "ÉTER", req: 90, level: 4 },
    { core: "#fde68a", mid: "#d97706", outer: "#92400e", name: "ASCENSIÓN", req: 365, level: 5 },
  ];"""

for file_path in app_files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        content = re.sub(r'const RANKS = \[.*?\];', new_ranks_app, content, flags=re.DOTALL)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

if os.path.exists(landing_file):
    with open(landing_file, "r", encoding="utf-8") as f:
        content = f.read()
    content = re.sub(r'const RANKS = \[.*?\];', new_ranks_landing, content, flags=re.DOTALL)
    with open(landing_file, "w", encoding="utf-8") as f:
        f.write(content)
