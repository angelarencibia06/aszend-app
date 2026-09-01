import os
with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()
if '@tailwind base;' not in css:
    css = "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n" + css
    with open('src/index.css', 'w', encoding='utf-8') as f:
        f.write(css)
