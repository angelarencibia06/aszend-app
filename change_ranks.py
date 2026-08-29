import os

app_files = [
    "src/pages/Home.jsx",
    "src/pages/Profile.jsx",
    "src/components/MilestoneOverlay.jsx"
]

old_ranks_1 = """const RANKS = [
  { id: 1, name: 'CHISPA', number: '01', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 0 },
  { id: 2, name: 'PULSO', number: '02', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 7 },
  { id: 3, name: 'NÚCLEO', number: '03', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 30 },
  { id: 4, name: 'CONVERGENCIA', number: '04', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 90 },
  { id: 5, name: 'ASCENSIÓN', number: '05', color1: '#93c5fd', color2: '#3b82f6', shadow: 'rgba(96, 165, 250, 0.5)', req: 365 },
];"""

old_ranks_2 = """const RANKS = [
  { id: 1, name: 'CHISPA', number: '01', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 0 },
  { id: 2, name: 'PULSO', number: '02', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 7 },
  { id: 3, name: 'NÚCLEO', number: '03', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 30 },
  { id: 4, name: 'NOVA', number: '04', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 90 },
  { id: 5, name: 'SUPERNOVA', number: '05', color1: '#f43f5e', color2: '#e11d48', shadow: 'rgba(244, 63, 94, 0.5)', req: 180 },
  { id: 6, name: 'ASCENSIÓN', number: '06', color1: '#93c5fd', color2: '#3b82f6', shadow: 'rgba(96, 165, 250, 0.5)', req: 365 },
];"""

new_ranks = """const RANKS = [
  { id: 1, name: 'VACÍO', number: '01', color1: '#64748b', color2: '#334155', shadow: 'rgba(100, 116, 139, 0.5)', req: 0 },
  { id: 2, name: 'PULSO', number: '02', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 7 },
  { id: 3, name: 'AURA', number: '03', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 30 },
  { id: 4, name: 'NÚCLEO', number: '04', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 90 },
  { id: 5, name: 'ÉTER', number: '05', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 180 },
  { id: 6, name: 'ASCENSIÓN', number: '06', color1: '#fcd34d', color2: '#d97706', shadow: 'rgba(252, 211, 77, 0.5)', req: 365 },
];"""

for file_path in app_files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # We don't know exactly which array format is in which file, so we try a robust replacement.
        import re
        content = re.sub(r'const RANKS = \[.*?\];', new_ranks, content, flags=re.DOTALL)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
