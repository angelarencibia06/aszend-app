import os

with open('src/index.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if '@tailwind' in line:
        continue
    if '@import "tailwindcss";' in line:
        continue
    if "@import url('https://fonts.googleapis.com" in line:
        continue
    new_lines.append(line)

final_css = '@import "tailwindcss";\n'
final_css += "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Oswald:wght@500;700&display=swap');\n\n"
final_css += "".join(new_lines)

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(final_css)
