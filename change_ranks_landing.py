import os

file_path = "../aszend_landing/src/App.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("'CHISPA'", "'VACÍO'")
content = content.replace('"CHISPA"', '"VACÍO"')
content = content.replace("CHISPA", "VACÍO")
content = content.replace("NÚCLEO", "AURA")
content = content.replace("NOVA", "NÚCLEO")
content = content.replace("SUPERNOVA", "ÉTER")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
