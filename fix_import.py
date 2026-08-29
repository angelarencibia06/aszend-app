import os
import re

home_path = "../aszend_app/src/pages/Home.jsx"
with open(home_path, "r", encoding="utf-8") as f:
    home = f.read()

if "import { EnergyOrb }" not in home:
    # Safely insert after React import
    home = home.replace("import React,", "import { EnergyOrb } from '../components/EnergyOrb';\nimport React,")

with open(home_path, "w", encoding="utf-8") as f:
    f.write(home)
