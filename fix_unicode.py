# -*- coding: utf-8 -*-
with open("../aszend_app/src/pages/Home.jsx", "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "D?AS": "DÍAS",
    "das": "días",
    "mǭs": "más",
    "RECA?DA": "RECAÍDA",
    "Estimacin": "Estimación",
    "hǭbitos": "hábitos",
    "estǭ": "está",
    "anǭlisis": "análisis",
    "H?BITOS": "HÁBITOS",
    "'": "→"
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open("../aszend_app/src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(content)
