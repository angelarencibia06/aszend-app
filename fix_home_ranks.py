import os
import re

home_path = "../aszend_app/src/pages/Home.jsx"
with open(home_path, "r", encoding="utf-8") as f:
    home = f.read()

home = re.sub(r'const RANKS = \[.*?\];\n', '', home, flags=re.DOTALL)

with open(home_path, "w", encoding="utf-8") as f:
    f.write(home)
